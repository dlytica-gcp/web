from datetime import datetime, timedelta
import pytz

def get_nepal_cache_lifetime():
    # Set the timezone to Nepal
    nepal_timezone = pytz.timezone('Asia/Kathmandu')
    now_nepal = datetime.now(nepal_timezone)

    midnight_nepal = now_nepal.replace(
        hour=0, minute=0, second=0) + timedelta(days=1)
    remaining_seconds = (midnight_nepal - now_nepal).total_seconds()

    return int(remaining_seconds)
