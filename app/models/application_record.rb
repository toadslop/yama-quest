class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def type
    self.class.table_name
  end
end
