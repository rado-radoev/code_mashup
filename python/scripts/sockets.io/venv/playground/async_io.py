import asyncio

async def test():
    print('Hello world')

loop = asyncio.get_event_loop()

loop.run_until_complete(test())
loop.close()