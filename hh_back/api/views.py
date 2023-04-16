from .models import Company, Vacancy
from .serializers import CompanySerializer, CompanyModelSerializer, VacancyModelSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser


def vacancy_top(request):
    vacancies = Vacancy.objects.all().order_by('-salary')[:10]
    vacancies_json = [p.to_json() for p in vacancies]
    return JsonResponse(vacancies_json, safe=False, json_dumps_params={'indent': 2})


###################################################################################################
@csrf_exempt
def company_list(request):
    """
    List all transformers, or create a new transformer
    """
    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanyModelSerializer(companies, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CompanyModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def company_detail(request, company_id):
    try:
        company = Company.objects.get(pk=company_id)
    except Company.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CompanyModelSerializer(company)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CompanyModelSerializer(company, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        company.delete()
        return HttpResponse(status=204)


@csrf_exempt
def vacancy_list(request):
    """
    List all transformers, or create a new transformer
    """
    if request.method == 'GET':
        vacancies = Vacancy.objects.all()
        serializer = VacancyModelSerializer(vacancies, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = VacancyModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def vacancy_detail(request, vacancy_id):
    try:
        vacancy = Vacancy.objects.get(pk=vacancy_id)
    except Vacancy.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = VacancyModelSerializer(vacancy)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = VacancyModelSerializer(vacancy, data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        vacancy.delete()
        return HttpResponse(status=204)


@csrf_exempt
def vacancy_list_by_company(request, company_id):
    if request.method == 'GET':
        vacancies = Vacancy.objects.filter(company_id=company_id)
        serializer = VacancyModelSerializer(vacancies, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data["company"] = company_id
        serializer = VacancyModelSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
