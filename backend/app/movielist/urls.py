from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('movies', views.MovieViewSet)
router.register('genres', views.GenreViewSet)
router.register('companies', views.ProductionCompaniesViewSet)
router.register('countries', views.ProductionCountriesViewset)
router.register('categories', views.MovieCategoryViewset)
router.register('tags', views.TagsViewset)
# router.register('paths', views.MovieUrlViewset)
router.register('collection', views.CollectionViewset)


app_name = 'movie'

urlpatterns = [
    path('', include(router.urls)),
]