GEOJSON_TEMPLATE = {
  type: '',
  features: []
}

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def type
    self.class.table_name
  end

  def feature_collection(mountains)
    collection = GEOJSON_TEMPLATE
    collection[:type] = 'FeatureCollection'
    collection[:features] = mountains.map `&:geojson_feature`
  end
end
