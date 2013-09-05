# Require any additional compass plugins here.
require "rgbapng"

http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "js"

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
preferred_syntax = :scss

environment = :development

if environment == :production
    output_style = :compressed
else
	output_style = :nested
end
