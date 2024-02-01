import pandas as pd 

file = "listings summary (2).csv"
data = pd.read_csv(file,encoding = "utf-8")
print(data.head())