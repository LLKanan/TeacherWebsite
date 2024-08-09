def assignActivities(activities):
  #Sort the activites by the first integer provided for each activity
  sortedActivities = sorted(activities, key=lambda x: x[0])
  lSchedule = []
  cSchedule = []

  for activity in sortedActivities:
    start, end = activity
    #If this activity's starting time is at or after loraine's previous activity time assign to loraine
    if not lSchedule or start >= lSchedule[-1][1]:
      lSchedule.append(activity)
    #else if this activity's starting time is at or after charles' previous activity time assign to charles
    elif not cSchedule or start >= cSchedule[-1][1]:
      cSchedule.append(activity)
    #Else it's impossible
    else:
      return "IMPOSSIBLE"
    
  #Convert the activities to string for return
  schedule = ""
  for activity in activities:
    if activity in lSchedule:
      schedule += "C"
    else:
      schedule += "J"
  return schedule


def main():
  t = int(input())
  cases = []
  #Read all inputs
  for case in range(1, t+1):
    n = int(input())
    activities = [tuple(map(int,input().split())) for _ in range(n)]
    cases.append(activities)
  #Process them
  for case in range(1, t+1):
    result = assignActivities(cases[case-1])
    print(f"Case #{case}: {result}")

if __name__ == "__main__":
  main()