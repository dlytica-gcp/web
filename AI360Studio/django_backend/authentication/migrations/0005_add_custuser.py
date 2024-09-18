from django.db import migrations
 
def add_customuser(apps, schema_editor):
    CustomUser = apps.get_model('authentication', 'CustomUser')
    result = CustomUser.objects.create_user(
        email='dlytica@gmail.com',
        username='dlytica',
        password='dlytica@D123#',
        role='admin'
    )
    result.save()
 
   
class Migration(migrations.Migration):
 
    dependencies = [
        ('authentication', '0004_alter_customuser_options'),
    ]
 
    operations = [
        migrations.RunPython(add_customuser),
    ]