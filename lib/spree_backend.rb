require "spree/backend"

module Spree
  def self.admin_path
    Spree::Backend::Config[:admin_path]
  end

  # Used to configure admin_path for Spree
  #
  # Example:
  #
  # write the following line in `config/initializers/spree.rb`
  #   Spree.admin_path = '/custom-path'

  def self.admin_path=(path)
    Spree::Backend::Config[:admin_path] = path
  end
end
