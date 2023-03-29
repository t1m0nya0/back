from django.urls import path
from api.views import *


urlpatterns = [
    path('products/', products),
    path('products/<int:id>/', products_by_id),
    path('categories/', categories),
    path('categories/<int:id>/', categories_by_id),
    path('categories/<int:id>/products/', products_by_category_id),
]
