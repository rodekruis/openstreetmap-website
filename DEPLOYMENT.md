# Open a virtual server

Install iD editor:
https://github.com/rodekruis/iD/tree/custom-damage-assessment

# Change the imagery
nano data/update_imagery.js
npm install

##openstreetmap-website

#rebuild vendor assets
cd /var/www/vhosts/openstreetmap-website
rm -rf vendor/assets/iD && bundle exec vendorer
bundle exec rake assets:precompile db:migrate RAILS_ENV=production
sudo service apache2 restart


sudo -u postgres -i
createdb osm_sxm_20170926_2

pg_restore -a -d osm_sxm_20170926_2 building_centroids.backup
bundle exec rake db:create

psql -d osm_sxm_20170926_2 -c "CREATE EXTENSION btree_gist"

psql -d osm_sxm_20170926_2 -c "CREATE FUNCTION maptile_for_point(int8, int8, int4) RETURNS int4 AS '`pwd`/db/functions/libpgosm', 'maptile_for_point' LANGUAGE C STRICT"
psql -d osm_sxm_20170926_2 -c "CREATE FUNCTION tile_for_point(int4, int4) RETURNS int8 AS '`pwd`/db/functions/libpgosm', 'tile_for_point' LANGUAGE C STRICT"
psql -d osm_sxm_20170926_2 -c "CREATE FUNCTION xid_to_int4(xid) RETURNS int4 AS '`pwd`/db/functions/libpgosm', 'xid_to_int4' LANGUAGE C STRICT"


export RAILS_ENV=production
rake secret
 export SECRET_KEY_BASE=


#read shapefile
python ogr2osm.py /var/www/vhosts/openstreetmap-website/imports/building_centroids.shp

nano building_centroids.osm
// replace all <node id="- with <node id=" (basically removing the negative ID's)

./osmconvert64 ogr2osm/building_centroids.osm -o=ogr2osm/building_centroids.pbf

# create authfile
host=localhost
database=osm_2
user=postgres
password=pgsql
dbType=postgresql



osmosis --read-pbf-fast /root/ogr2osm/building_centroids.pbf --log-progress --write-apidb authFile=/var/www/vhosts/openstreetmap-website/authFile validateSchemaVersion=no

# clean up
psql -U postgres -d osm -c "select setval('changesets_id_seq', (select max(id) from changesets))"
psql -U postgres -d osm -c "select setval('current_nodes_id_seq', (select max(node_id) from nodes))"
psql -U postgres -d osm -c "select setval('current_ways_id_seq', (select max(way_id) from ways))"
psql -U postgres -d osm -c "select setval('current_relations_id_seq', (select max(relation_id) from relations))"
psql -U postgres -d osm -c "select setval('users_id_seq', (select max(id) from users))"

##postgres
sudo /etc/init.d/postgresql restart
