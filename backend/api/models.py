from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, intra_id, **extra_fields):
        if not intra_id:
            raise ValueError('The Intra ID must be set')
        user = self.model(intra_id=intra_id, **extra_fields)
        user.save(using=self._db)
        user.set_unusable_password()
        return user

    def create_superuser(self, intra_id, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(intra_id, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    intra_id = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    game_status = models.BooleanField(default=False)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(
        Permission, related_name='custom_user_set'
    )

    USERNAME_FIELD = 'intra_id'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.intra_id