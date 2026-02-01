from pymongo import MongoClient

# Requires the PyMongo package.
# https://api.mongodb.com/python/current

client = MongoClient('mongodb://ac-wygavfj-shard-00-02.gz06otf.mongodb.net,ac-wygavfj-shard-00-01.gz06otf.mongodb.net,ac-wygavfj-shard-00-00.gz06otf.mongodb.net/?tls=true&authMechanism=MONGODB-X509&authSource=%24external&serverMonitoringMode=poll&maxIdleTimeMS=30000&minPoolSize=0&maxPoolSize=5&maxConnecting=6&replicaSet=atlas-100uke-shard-0&appName=Data+Explorer--697e84b0c055faa91b3d3c59')
filter={}

result = client['escuela']['alumnos'].find(
  filter=filter
)
