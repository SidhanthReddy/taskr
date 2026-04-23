import redis
import json
import time
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

# Redis
r = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    decode_responses=True
)

# Mongo
client = MongoClient(os.getenv("MONGO_URI"))
db = client["mern_ai"]
tasks = db["tasks"]

# Operations
def process_task(input_text, operation):
    if operation == "uppercase":
        return input_text.upper()
    elif operation == "lowercase":
        return input_text.lower()
    elif operation == "reverse":
        return input_text[::-1]
    elif operation == "wordcount":
        return str(len(input_text.split()))
    else:
        raise Exception("Invalid operation")

print("Worker started...")
while True:
    try:
        _, job = r.brpop("taskQueue")
        job_data = json.loads(job)

        task_id = ObjectId(job_data["taskId"])

        task = tasks.find_one({"_id": task_id})

        if not task:
            continue

        print(f"Processing task {task_id}")

        # Mark running + log
        tasks.update_one(
            {"_id": task_id},
            {
                "$set": {"status": "running"},
                "$push": {"logs": {"message": "Processing started"}}
            }
        )

        try:
            result = process_task(job_data["input"], job_data["operation"])

            tasks.update_one(
                {"_id": task_id},
                {
                    "$set": {
                        "status": "success",
                        "result": result
                    },
                    "$push": {
                        "logs": {"message": "Completed successfully"}
                    }
                }
            )

        except Exception as e:
            print("Task failed:", str(e))

            # retry logic
            if task.get("retryCount", 0) < 3:
                tasks.update_one(
                    {"_id": task_id},
                    {
                        "$inc": {"retryCount": 1},
                        "$push": {
                            "logs": {"message": f"Retrying due to error: {str(e)}"}
                        }
                    }
                )

                # requeue
                r.lpush("taskQueue", job)

            else:
                tasks.update_one(
                    {"_id": task_id},
                    {
                        "$set": {"status": "failed"},
                        "$push": {
                            "logs": {"message": f"Failed permanently: {str(e)}"}
                        }
                    }
                )

    except Exception as e:
        print("Worker error:", str(e))
        time.sleep(2)