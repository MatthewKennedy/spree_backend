require "spree/dash"

module Spree
  def self.dash_path
    Spree::Dash::Config[:dash_path]
  end

  # Used to configure dash_path for Spree
  #
  # Example:
  #
  # write the following line in `config/initializers/spree.rb`
  #   Spree.dash_path = '/custom-path'

  def self.dash_path=(path)
    Spree::Dash::Config[:dash_path] = path
  end
end
