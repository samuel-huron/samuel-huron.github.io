#  READ ME 

## To add a colum 


## To create thumbnails based 

sudo mogrify             \
  -resize 150x150     \
  -background white \
  -gravity center   \
  -format png       \
  -quality 100       \
  -path thumbs      \
   *.png


## To run the website locally: 

python -m SimpleHTTPServer 8000