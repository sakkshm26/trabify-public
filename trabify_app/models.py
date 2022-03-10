from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy
from trabify.settings import AUTH_USER_MODEL

User = AUTH_USER_MODEL

# BRANCH_CHOICES = [
#     ('CE', 'Civil Engineering'),
#     ('CSE', 'Computer Science and Engineering'),
#     ('CSEAIML', 'Computer Science and Engineering (AI & ML)'),
#     ('CSEDS', 'Computer Science and Engineering (Data Science)'),
#     ('IT', 'Information Technology'),
#     ('ECE', 'Electronics and Communication Engineering'),
#     ('EE', 'Electrical Engineering'),
#     ('EEE', 'Electrical and Electronics Engineering'),
#     ('ME', 'Mechanical Engineering'),
# ]

# YEAR_CHOICES = [
#     ('FR', 'Freshman'),
#     ('SO', 'Sophomore'),
#     ('JR', 'Junior'),
#     ('SR', 'Senior'),
# ]

SEMESTER_CHOICES = [
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
]

SESSION_CHOICES = [
    ('2015-2016', '2015-2016'),
    ('2016-2017', '2016-2017'),
    ('2017-2018', '2017-2018'),
    ('2018-2019', '2018-2019'),
    ('2019-2020', '2019-2020'),
    ('2020-2021', '2020-2021'),
    ('2021-2022', '2021-2022'),
]

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

class AccountManager(BaseUserManager):
    def create_user(self, email, name, phone, password=None):
        # if not email:
        #     raise ValueError('Users must have an email address')
        # if not username:
        #     raise ValueError('Users must have an username')
        user = self.model(
            email = self.normalize_email(email),
            name = name,
            phone = phone,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password, phone):
        user = self.create_user(
            email=self.normalize_email(email),
            name=name,       
            phone = phone, 
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True 
        user.save(using = self._db)
        return user

class Account(AbstractBaseUser):
    email = models.EmailField(max_length=40, unique=True)
    name = models.CharField(max_length=30)
    phone = PhoneNumberField(null=True, blank=True, default="None")
    date_joined = models.DateTimeField(verbose_name="date_joined",auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','phone']

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    

class Book(models.Model):
    name = models.CharField(max_length=100)
    session = models.CharField(choices=SESSION_CHOICES, max_length=10)
    subject = models.CharField(max_length=50)
    semester = models.IntegerField(choices=SEMESTER_CHOICES, default=1, null=True, blank=True)
    year = models.PositiveSmallIntegerField(default=1,validators=[ MinValueValidator(1), MaxValueValidator(4)])
    date_posted = models.DateTimeField(auto_now_add=True)
    price = models.PositiveSmallIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField("Image", upload_to=upload_to, default='posts/default.png')