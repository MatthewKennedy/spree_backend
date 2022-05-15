require_relative 'lib/spree/backend/version'

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'spree_backend'
  s.version     = Spree::Backend.version
  s.authors     = ['Sean Schofield', 'Spark Solutions']
  s.email       = 'hello@spreecommerce.org'
  s.summary     = 'Admin Dashboard for Spree eCommerce platform'
  s.description = 'Admin Dashboard for Spree eCommerce platform'
  s.homepage    = 'https://spreecommerce.org'
  s.license     = 'BSD-3-Clause'

  s.metadata = {
    'bug_tracker_uri' => 'https://github.com/spree/spree_backend/issues',
    'changelog_uri' => "https://github.com/spree/spree_backend/releases/tag/v#{s.version}",
    'documentation_uri' => 'https://dev-docs.spreecommerce.org/',
    'source_code_uri' => "https://github.com/spree/spree_backend/tree/v#{s.version}",
  }

  s.required_ruby_version = '>= 2.5'

  s.files        = `git ls-files`.split("\n").reject { |f| f.match(/^spec/) && !f.match(/^spec\/fixtures/) }
  s.require_path = 'lib'
  s.requirements << 'none'

  s.add_dependency 'spree', '>= 4.4.0'

  s.add_dependency 'hotwire-rails'
  s.add_dependency 'inline_svg', '~> 1.5'
  s.add_dependency 'jsbundling-rails'
  s.add_dependency 'responders'
end
