print(os.getenv('ADMIN_PASSWORD'))
if os.getenv('ADMIN_PASSWORD') != None:
  return 0
else:
  return 1
