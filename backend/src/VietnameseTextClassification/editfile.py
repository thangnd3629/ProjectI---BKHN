
f = open(r"data\test\test.txt", "w",encoding='utf-16-le')
f.write("Món ăn ngon")
f.close()

#open and read the file after the appending:
f = open(r"data\test\test.txt", "r",encoding='utf-16-le')
print(f.read())