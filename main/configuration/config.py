#! /usr/bin/python
# -*- coding:utf-8 -*-
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = "c~\xdf\x9d\x1c\xc4U=?\xa4}\x92\xa7:R"
    
    @staticmethod
    def init_app(app):
        pass


class DeveloppementConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgresql://geonatatlas:T,0602,L@localhost:5432/geonatureatlas"

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = "postgresql://geonatatlas:T,0602,L@localhost:5432/geonatureatlas" 



config = {
    'development':DeveloppementConfig,
    'production': ProductionConfig
    }

database_connection = "postgresql://geonatatlas:T,0602,L@localhost:5432/geonatureatlas"


# Customisation application

# nom de la structure
STRUCTURE = "Parc national des Écrins"
STRUCTURE = unicode(STRUCTURE, 'utf-8')

#URL de l'application depuis la racine
URL_APPLICATION = "/atlas"

#Map
IGNAPIKEY = '9lecnwu27bjiw08s384hvzhi';

MAP = { 
    'LAT_LONG': [44.7952, 6.2287],
    'FIRST_MAP': { 
            'url' : 'http://gpp3-wxs.ign.fr/'+IGNAPIKEY+'/wmts?LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD&EXCEPTIONS=text/xml&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM&&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}',
            'attribution' : '&copy; <a href="http://www.ign.fr/">IGN</a>',
            'tileName' : 'IGN'
        },
        'SECOND_MAP' : {"url" :'https://gpp3-wxs.ign.fr/'+IGNAPIKEY+'/geoportail/wmts?LAYER=ORTHOIMAGERY.ORTHOPHOTOS&EXCEPTIONS=text/xml&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
              "attribution": "",
              "tileName" : 'Ortho IGN'
            },
        'ZOOM' : 10,
        # Pas du slider sur les annees d observations: 1 = pas de 1 ans sur le slider
        'STEP': 1
}



# affiche par maille / True = maille False = point
AFFICHAGE_MAILLE = True

# Niveau de zoom à partir duquel on passe à l'affiche en point (si AFFICHAGE_MAILLE = False)
ZOOM_LEVEL_POINT = 11

#Limite d'observation à partir duquel on passe à l'affichage en cluster
LIMIT_CLUSTER_POINT = 1000

# Nombre de 'x' dernieres observations de la carte sur la page d'acceuil
NB_LAST_OBS = 100





# rang taxonomique qui fixe jusque quel taxon remonte la filiation taxonomique (hierachie dans la fiche d'identite)
LIMIT_RANG_TAXONOMIQUE_HIERARCHIE = 13

# rang taxonomique qui fixe la limite de l'affichage de la fiche espece ou de la liste  ** 35 = ESPECE **  on prend tout ce qui est inferieur ou egal a l'espece pour faire des fiches et ce qui est superieur pour les listes
LIMIT_FICHE_LISTE_HIERARCHY = 28

#URL du stockage des photo

URL_MEDIAS = "http://portail.ecrins-parcnational.fr/taxhub/"


####ID DES ATTRIBUTS DESCRIPTIF DES TAXONS DE LA TABLE vm_cor_taxon_attribut
ATTR_DESC = 100
ATTR_COMMENTAIRE = 101
ATTR_MILIEU = 102
ATTR_CORROLOGIE = 103


####ID DES ATTRIBUTS DES MEDIAS DE LA TABLE vm_medias
ATTR_MAIN_PHOTO = 1
ATTR_OTHER_PHOTO = 2


## BLOC STAT : parametre pour le bloc statistique 2 de la page d'acceuil
# mettre dans RANG_STAT le couple 'rang taxonomique' - 'nom du taxon corepondant au rang' pour avoir des statistique sur ce rang -
#Fonctionne à tous les niveau de rang présent dans la table taxref - Important: mettre au maximum deux 'couples' dans le tableau

# exemple RANG_STAT = [{'ordre': '"Lepidoptera"'}, {'classe': 'Insecta'}]
#         RANG_STAT_FR ['Papillon', 'Insecte']

RANG_STAT = [{'regne': 'Animalia'}, {'regne': 'Plantae'}] 
RANG_STAT_FR = ['Faune', 'Flore']
