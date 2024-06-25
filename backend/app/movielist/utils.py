
import base64
from django.core.files.base import ContentFile

def decode_base64_file(data):
        format, imgstr = data.split(';base64,')
        ext = format.split('/')[-1]
        return base64.b64decode(imgstr), ext
            
            
def base64_to_file(data, name):
    decoded_file, ext = decode_base64_file(data)
    return ContentFile(decoded_file, name=f'{name}.{ext}')        