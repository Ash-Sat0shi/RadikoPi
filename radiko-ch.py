#! /usr/bin/python3
# -*- coding: utf-8 -*-
#
#   radiko_xml_json.py
#
#                       Jan/16/2018
# --------------------------------------------------------------------
import xml.dom.minidom
import  sys
import  json
import requests
#
# --------------------------------------------------------------------
def file_write_proc(file_name,str_out):
#
    fp_out = open(file_name,mode='w',encoding='utf-8')
    fp_out.write(str_out)
    fp_out.close()
#
# --------------------------------------------------------------------
# [6-6]: 
def xml_to_dict_proc (xml_str_in):
    unit_aa = {}
#
    dom_in=xml.dom.minidom.parseString (xml_str_in)
    stations=dom_in.getElementsByTagName ("name")

    for station in stations:
        parent=station.parentNode
        id=parent.getElementsByTagName("id")[0].firstChild.nodeValue
        name=parent.getElementsByTagName("name")[0].firstChild.nodeValue
        print("\t",id,name)
        unit_aa[id] = name
#
    return  unit_aa
# --------------------------------------------------------------------
# [6]: 
def area_parser(key):
    print(key)
    url_radiko = "http://radiko.jp/v2/station/list/" + key + ".xml"
    rr=requests.get(url_radiko)
    xml_str = str(rr.content,'utf-8')
    unit_aa = xml_to_dict_proc (xml_str)
#
    return unit_aa
# --------------------------------------------------------------------
#
json_file= "stations.json"
#
dict_aa = {}
#
for it in range(11,12):
    key = "JP%d" % (it+1)  
    unit_aa = area_parser(key)
    dict_aa[key] = unit_aa
#
out_str = json.dumps(dict_aa)
file_write_proc(json_file,out_str)
#
# --------------------------------------------------------------------
