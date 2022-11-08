import os
import json

arr = os.listdir("./compressed-cp")

results = []

for file in arr:
    entry = {
        "title": file
    }
    results.append(entry)
    
print(json.dumps(results))