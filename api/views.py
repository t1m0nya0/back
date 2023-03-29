from json import dumps

from django.core import serializers
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from api.models import *

# Create your views here.


def products(request):
    all_products = serializers.serialize("json", Product.objects.all())
    return JsonResponse({'all_products': all_products})


def products_by_id(request, product_id):
    product = serializers.serialize("json", Product.objects.filter(pk=product_id))
    return JsonResponse({'product': product})


def categories(request):
    cat = serializers.serialize("json", Category.objects.all())
    return JsonResponse({'categories': cat})


def categories_by_id(request, category_id):
    cat = serializers.serialize("json", Category.objects.filter(pk=category_id))
    return JsonResponse({'category': cat})


def products_by_category_id(request, category_id):
    products_by_cat = serializers.serialize("json", Product.objects.filter(cat_id=category_id))
    return JsonResponse({'products_by_category': products_by_cat})
