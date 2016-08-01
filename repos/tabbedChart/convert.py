import os
import json

__csv__ = './csv'
__json__ = './data'

csv_list = os.listdir(__csv__)

def toJson():
  for csv in csv_list:
    p#rint 'file:', csv
    csv_name = __csv__ + '/' + csv
    json_name = __json__ + '/' + csv.split('.')[0] + '.json'
    f = open(csv_name, 'r')
    head = f.readline()
    head_cols = head.split(',')
    
    result = []
  
    lines = f.readlines()
    print len(lines)
    for line in lines:
      cur_cols = line.split(',')
      for x1,y1 in enumerate(cur_cols):
        cur_key = y1
        item = {}
        for x2,y2 in enumerate(head_cols):
          key = y2.replace('\r', '').replace('\n', '')
          val = cur_cols[x2].replace('\r', '').replace('\n', '')
          item[key] = val
      result.append(item);
    f.close()

    f_to = open(json_name, 'w')
    f_to.write(json.dumps(result))
    f_to.close()

toJson()