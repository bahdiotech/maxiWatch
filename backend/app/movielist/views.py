from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)
from rest_framework.parsers import MultiPartParser, BaseParser
from rest_framework import (mixins,
                            response,
                            status,
                              viewsets,
                              generics)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination



from core.models import (
                        Movie,
                        Collection,
                        Genre,
                        ProductionCountries,
                        ProductionCompanies,
                        Categories,
                        User,
                        Tags,
                        ProductionCountries
                        )
from movielist.permissions import IsAdminOrReadOnly
from . import serializers


class MoviePagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                name='video_paths',
                type=OpenApiTypes.BYTE,
                description='Comma separated list of IDs to filter',
            ),
            OpenApiParameter(
                name='ingredients',
                type=OpenApiTypes.STR,
                description='Comma separated list of IDs to filter',
            ),
            OpenApiParameter(
                name='collection',
                type=OpenApiTypes.STR,
                description='Comma separated list of IDs to filter',
            ),
            OpenApiParameter(
                name='Production Companies',
                type=OpenApiTypes.STR,
                description='Comma separated list of IDs to filter',
            ),
            OpenApiParameter(
                name='Production Countries',
                type=OpenApiTypes.STR,
                description='Comma separated list of IDs to filter',
            ),
            OpenApiParameter(
                name='Production tags',
                type=OpenApiTypes.STR,
                description='Comma separated list of IDs to filter',
            ),
        ]
    )
)
class MovieViewSet(viewsets.ModelViewSet):
    """Manage movies in the database"""
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAdminOrReadOnly,)
    permission_classes = (IsAuthenticated,)
    queryset = Movie.objects.all()
    serializer_class = serializers.MovieSerializer
    pagination_class = MoviePagination
    filter_backends = (SearchFilter,)
    search_fields = ('title', 'description', 'collection__name', 'genres__name', 'production_countries__name', )

    def _params_to_inst(self, qs):
        """Convert a list of strings to Integers"""
        return [int(str_id) for str_id in qs.split(',')]
    def get_queryset(self):
        collection = self.request.query_params.get('collection')
        movie_path = self.request.query_params.get('movie_path')
        genres = self.request.query_params.get('genres')
        production_countries = self.request.query_params.get('production_countries')
        production_companies = self.request.query_params.get('production_companies')
        movie_categories = self.request.query_params.get('movie_categories')
        tags = self.request.query_params.get('tags')
        qs = self.queryset
        user = self.request.user
        
        cus_ob = [collection,genres, production_companies, production_countries,movie_categories,tags, movie_path]
        for data in cus_ob:
            if data:
                qs = self._params_to_inst(data)
                qs = self.queryset.filter(id__in=qs)
        return qs.filter().order_by('-id').distinct()
    
    def get_serializer_class(self):
        if self.action == "upload_video":
            return serializers.MoviefileSerializer
        
        return serializers.MovieSerializer
    
    def perform_create(self, serializer):
        auth_user = self.request.user
        return serializer.save(user=auth_user)
    
    @action(methods=['POST'], detail=True, url_path='upload-video')
    def upload_video(self, request, pk=None):
        movie = Movie.objects.get(pk=pk)
        movie= self.get_object()
        # serializer = serializers.MoviefileSerializer(movie, data=request.data)
        serializer  = self.get_serializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_200_OK)

        return response.Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    
class BaseRecipeAtrrViewSet(mixins.ListModelMixin,
                            viewsets.GenericViewSet,
                            mixins.RetrieveModelMixin,
                            mixins.CreateModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            ):
    """Base viewset for Recipe Attribute"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    
    def get_queryset(self):
        """Filter queryset to authnticated user."""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(recipes__isnull=False)
        return queryset.filter().order_by('-name').distinct()
    
class GenreViewSet(BaseRecipeAtrrViewSet):
    """Manage genres in the database"""
    serializer_class = serializers.GenreSerializer
    queryset = Genre.objects.all()

class ProductionCompaniesViewSet(BaseRecipeAtrrViewSet):
    """Manage genres in the database"""
    serializer_class = serializers.ProductionCompaniesSerializer
    queryset = ProductionCompanies.objects.all()
    
class ProductionCountriesViewset(BaseRecipeAtrrViewSet):
    """Manage genres in the database"""
    serializer_class = serializers.ProductionCountriesSerializer
    queryset = ProductionCountries.objects.all()
    
class MovieCategoryViewset(BaseRecipeAtrrViewSet):
    serializer_class = serializers.CategoriesSerializer
    queryset = Categories.objects.all()

class TagsViewset(BaseRecipeAtrrViewSet):
    serializer_class = serializers.TagSerializer
    queryset = Tags.objects.all()
    
# class MovieUrlViewset(viewsets.ModelViewSet):
#     serializer_class = serializers.MovieUrlSerializer
#     queryset = Movie_paths.objects.all()
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAdminUser,)
#     # def perform_create(self, serializer):
#     #     auth_user = self.request.user
#     #     input_title = serializer.validated_data['movie']
#     #     movietitle =  Movie.objects.get(**input_title)
#     #     movietitle.save()
#     #     print(input_title)
#     #     print(movietitle)
#     #     return serializer.save(user=auth_user,movie=movietitle)
#     def perform_create(self, serializer):
#         auth_user = self.request.user
#         return serializer.save(user=auth_user)
        
    
class CollectionViewset(BaseRecipeAtrrViewSet):
    serializer_class = serializers.CollectionSerializer
    queryset = Collection.objects.all()
    
    def perform_create(self, serializer):
        auth_user = self.request.user
        return serializer.save(user=auth_user)

