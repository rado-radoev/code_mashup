#!/usr/bin/env python

import client_data
import pika
import sys
import json

connection = pika.BlockingConnection(
    pika.ConnectionParameters('localhost')
)
channel = connection.channel()

channel.queue_declare(queue='everything')
channel.queue_declare(queue='results')

def callback(ch, method, properties, body):
    client = client_data.ClientData(
        '192.168.186.5',
        'user', 
        'pass', 
        'http://www.google.com', 
        5)
    json_client = json.dumps(client)

    channel.basic_publish(
        exchange='', 
        routing_key='results',
        body=json_client)

channel.basic_consume(
    queue='everything',
    on_message_callback=callback,
    auto_ack=True)

channel.start_consuming()