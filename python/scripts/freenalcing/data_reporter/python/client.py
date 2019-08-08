#!/usr/bin/env python

import client_data
import pika
import sys
import json
import time

from TimerThread import TimerThread
from utility import getIP


connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='everything')
channel.queue_declare(queue='results')

def send_data_to_server(json_data):
    client = client_data.ClientData(
        getIP()[1],
        json_data['user'], 
        json_data['pass'], 
        json_data['url'], 
        5)

    json_client = client.toJSON()

    channel.basic_publish(
        exchange='', 
        routing_key='results',
        body=json_client)

def callback(ch, method, properties, body):
    received_body = json.loads(body)
    
    # timer = TimerThread(1, send_data_to_server, args=(received_body,))
    # timer.start()
    # time.sleep(received_body['update_interval'])
    # timer.cancel()


    client = client_data.ClientData(
        getIP()[1],
        received_body['user'], 
        received_body['pass'], 
        received_body['url'], 
        5)
    json_client = client.toJSON()

    channel.basic_publish(
        exchange='', 
        routing_key='results',
        body=json_client)

channel.basic_consume(
    queue='everything',
    on_message_callback=callback,
    auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()