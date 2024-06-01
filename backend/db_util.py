# from config import PG_USER, PG_PASSWORD, PG_HOST, PG_DB
# import psycopg2
import mysql.connector


def get_connection():
    return mysql.connector.connect(host='localhost', database='medlocator', user='root', password='')