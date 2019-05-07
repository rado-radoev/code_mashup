import schedule
import time

def job(message):
    print(message)

schedule.every(1).seconds.do(job, "Test job")

while True:
    schedule.run_pending()
    time.sleep(5)