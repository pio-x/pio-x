

from locust import HttpLocust, TaskSet

def config(l):
    l.client.get("/config?hash=111")

def team(l):
    l.client.get("/team?hash=111")

def mrx(l):
    l.client.get("/mrx?hash=111")

def riddle(l):
    l.client.get("/riddle?hash=111")

def station(l):
    l.client.get("/station?hash=111")

def notification(l):
    l.client.get("/notification?hash=111")

class UserBehavior(TaskSet):
    tasks = {config:2, team: 10, mrx: 4, riddle: 6, station: 15, notification: 8}

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 1000
    max_wait = 2000