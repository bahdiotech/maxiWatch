from core import models
from rest_framework import serializers
import base64
from django.core.files.base import ContentFile
import uuid


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Genre
        exclude = ('user', )
        read_only_fields = ('id',)

class ProductionCompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductionCompanies
        exclude = ('user', )
        read_only_fields = ('id',)

class ProductionCountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductionCountries
        exclude = ('user', )
        read_only_fields = ('id',)
        

class TagSerializer(serializers.ModelSerializer):
    movie_list = serializers.StringRelatedField(many=True, required=False)
    class Meta:
        model = models.Tags
        exclude = ('user', )
        read_only_fields = ('id','movie_list',)
        
        
class CategoriesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Categories
        exclude = ('user', )
        read_only_fields = ('id',)



class Base64SubtitleField(serializers.FileField):
    def to_internal_value(self, data):
        if isinstance(data, str):
            if 'data:' in data and ';base64,' in data:
                header, data = data.split(';base64,')
            try:
                decoded_file = base64.b64decode(data)
            except TypeError as e:
                raise serializers.ValidationError(f"Error decoding Base64 data: {e}")
                # self.fail('invalid_file')

            file_name = str(uuid.uuid4())[:12]
            file_extension = self.get_file_extension(header)

            complete_file_name = f"{file_name}.{file_extension}"
            data = ContentFile(decoded_file, name=complete_file_name)

        return super().to_internal_value(data)

    def get_file_extension(self, header):
        # Determine file extension from the MIME type
        if 'text/vtt' in header:
            return 'vtt'
        if 'text/plain' in header:
            return 'srt'
        if 'application/octet-stream' in header:
            return 'srt'
        raise serializers.ValidationError('Unsupported subtitle format')
        

    
class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str):
            if 'data:' in data and ';base64,' in data:
                header, data = data.split(';base64,')
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                raise serializers.ValidationError('Invalid image')

            file_name = str(uuid.uuid4())[:12]
            file_extension = 'jpeg'  # Default to jpeg, adjust if needed

            complete_file_name = f"{file_name}.{file_extension}"
            data = ContentFile(decoded_file, name=complete_file_name)

        return super().to_internal_value(data)


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, required=False)
    collection = serializers.CharField(source='collection.name')
    production_countries = ProductionCountriesSerializer(many=True, required=False)
    production_companies = ProductionCompaniesSerializer(many=True, required=False)
    categories = CategoriesSerializer(many=True, required=False)
    tags = TagSerializer(many=True, required=False)
    poster_path = Base64ImageField(max_length=None, use_url=True,allow_null=True, required=False)
    backdrop_path = Base64ImageField(max_length=None, use_url=True,allow_null=True, required=False)
    subtitle = Base64SubtitleField(max_length=None,allow_null=True, use_url=True, required=False)
    class Meta:
        model = models.Movie
        exclude = ('user', )
        read_only_fields = ('id',)
        

    def _get_or_create_genres(self, genres, movie):
        auth_user = self.context['request'].user
        for genre in genres:
            genre_obj, created = models.Genre.objects.get_or_create(
                user=auth_user,
                **genre,
            )
            movie.genres.add(genre_obj)

    def _get_or_create_productionCompanies(self, production_compaines, movie):
        auth_user = self.context['request'].user
        for production_company in production_compaines:
            production_company_obj, created = models.ProductionCompanies.objects.get_or_create(
                user=auth_user,
                **production_company,
            )
            movie.production_companies.add(production_company_obj)
    def _get_or_create_production_countries(self, ProductionCountries, movie):
        auth_user = self.context['request'].user
        for production_country in ProductionCountries:
            production_country_obj, created = models.ProductionCountries.objects.get_or_create(
                user=auth_user,
                **production_country,)
            movie.production_countries.add(production_country_obj)
            

    def _get_or_create_categories(self, categories, movie):
        auth_user = self.context['request'].user
        for category in categories:
            category_obj, created = models.Categories.objects.get_or_create(
                user=auth_user,
                **category,
            )
            movie.categories.add(category_obj)
            
    
    def _get_or_create_tags(self, tags, movie):
        auth_user = self.context['request'].user
        for tag in tags:
            tag_obj, created = models.Tags.objects.get_or_create(
                user=auth_user,
                **tag,
            )
            movie.tags.add(tag_obj)


        
    def create(self,validated_data):
        auth_user = self.context['request'].user
        collection = validated_data.pop('collection', None)
        genres = validated_data.pop('genres',[])
        production_companies = validated_data.pop('production_companies',[])
        production_countries = validated_data.pop('production_countries',[])
        categories = validated_data.pop('categories',[])
        tags = validated_data.pop('tags',[])
        collection_obj, created = models.Collection.objects.get_or_create(user=auth_user, **collection)
        movie = models.Movie.objects.create(**validated_data, collection=collection_obj)
        
        
        self._get_or_create_productionCompanies(production_companies, movie)
        self._get_or_create_genres(genres, movie)
        self._get_or_create_production_countries(production_countries, movie)
        self._get_or_create_categories(categories, movie)
        self._get_or_create_tags( tags, movie)
        
        
        return movie
    
    
    def update(self, instance, validated_data):
        collection = validated_data.pop('collection', None)
        genres = validated_data.pop('genres', None)
        production_companies = validated_data.pop('production_companies',None)
        production_countries = validated_data.pop('production_countries',None)
        movie_Categories = validated_data.pop('categories', None)
        tags = validated_data.pop('tags',None)
        instance.time_updated = validated_data.get('time_uploaded',instance.time_updated)
        auth_user = self.context['request'].user
        if collection is not None:
            collection_obj, created = models.Collection.objects.get_or_create(user=auth_user, **collection)

        if genres is not None:
            instance.genres.clear()
            self._get_or_create_genres(genres, instance)
        if production_companies is not None:
            instance.production_companies.clear()
            self._get_or_create_productionCompanies(production_companies, instance)
        if production_countries is not None:
            instance.production_countries.clear()
            self._get_or_create_production_countries(production_countries, instance)
        
        if movie_Categories is not None:
            instance.categories.clear()
            self._get_or_create_categories(movie_Categories, instance)
        
        if tags is not None:
            instance.tags.clear()
            self._get_or_create_tags(tags, instance)
        
        
        if collection is not None:
            instance.collection = collection_obj
            
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
        
    # def to_representation(self, instance):
    #     user = self.context['request'].user
    #     data =  super().to_representation(instance)
    #     if user.is_premium or user.is_superuser or user.is_staff:
    #         data['movie_path'] = data['movie_path']
    #     else:
    #         data['movie_path'] = "you are not authorized to watch this movie"            
    #     return data

class CollectionSerializer(serializers.ModelSerializer):
    movie_list = MovieSerializer(many=True, required=False)
    class Meta:
        model = models.Collection
        exclude = ('user', )
        read_only_fields = ('id',)

class MoviefileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Movie
        fields = ('id', 'movie_path', )
        read_only_fields = ('id',)
        extra_kwargs = {'movie_path': {'required': 'True'}}
