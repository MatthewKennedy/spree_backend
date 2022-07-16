Spree::Core::Engine.add_routes do
  namespace :admin, path: Spree.admin_path do
    root to: "dashboard#show"

    # Addresses
    resources :addresses do
      member do
        get :edit_modal
      end
    end

    # Authentication
    resources :oauth_applications

    # Countries
    resources :countries do
      resources :states
    end

    # CMS Pages
    resources :cms_pages do
      resources :cms_sections, except: :index
    end

    # Dashboard
    resource :dashboard, only: [:show]

    # Error forbidden
    get "/forbidden", to: "errors#forbidden", as: :forbidden

    # Menus
    resources :menus do
      resources :menu_items, except: :index do
        member do
          delete :remove_icon
        end
      end
    end

    # Options
    resources :option_types do
      collection do
        post :update_positions
        post :update_values_positions
      end
    end
    delete "/option_values/:id", to: "option_values#destroy", as: :option_value

    # Orders
    resources :orders, except: [:show] do
      member do
        post :resend
        put :open_adjustments
        put :close_adjustments
        put :approve
        put :cancel
        put :resume
        get :channel
        put :set_channel
        put :reset_digitals
      end

      resources :customer_returns, only: [:index, :new, :edit, :create, :update] do
        member do
          put :refund
        end
      end

      resources :adjustments
      resources :return_authorizations do
        member do
          put :cancel
        end
      end

      resources :payments do
        member do
          put :fire
        end

        resources :log_entries
        resources :refunds, only: [:new, :create, :edit, :update]
      end

      resources :reimbursements, only: [:index, :create, :show, :edit, :update] do
        member do
          post :perform
        end
      end
    end

    # Payment Methods
    resources :payment_methods do
      collection do
        post :update_positions
      end
    end

    # Products
    resources :products do
      resources :product_properties do
        collection do
          post :update_positions
        end
      end
      resources :images do
        collection do
          post :update_positions
        end
      end
      member do
        post :update_availability
        post :update_cost_currency
        post :update_promotionable
        post :clone
        get :stock
      end
      resources :variants do
        collection do
          post :update_positions
        end
      end
      resources :variants_including_master, only: [:update]
      resources :prices, only: [:index, :create]
      resources :digitals, only: [:index, :create, :destroy]
    end

    # Properties
    resources :properties do
      collection do
        get :filtered
      end
    end

    # Product Properties
    delete "/product_properties/:id", to: "product_properties#destroy", as: :product_property

    # Prototypes
    resources :prototypes do
      member do
        get :select
      end

      collection do
        get :available
      end
    end

    # Promotions
    resources :promotions do
      resources :promotion_rules
      resources :promotion_actions
      member do
        post :clone
      end
    end
    resources :promotion_categories, except: [:show]

    # Returns
    get "/return_authorizations", to: "returns#return_authorizations", as: :return_authorizations
    get "/customer_returns", to: "returns#customer_returns", as: :customer_returns
    resources :return_items, only: [:update]

    # Reports
    resources :reports, only: [:index] do
      collection do
        get :sales_total
        post :sales_total
      end
    end

    # Roles
    resources :roles

    # Refunds
    resources :reimbursement_types
    resources :refund_reasons, except: :show
    resources :return_authorization_reasons, except: :show

    # Search
    resources :search

    # Shipping
    resources :shipping_methods
    resources :shipping_categories
    resources :shipments do
      member do
        %w[ready ship cancel resume pend].each do |state|
          patch state.to_sym
        end
        get :edit_tracking_number
        patch :add_item
        patch :remove_item
        patch :increment_item
        patch :transfer_to_location
        patch :transfer_to_shipment
      end
    end

    # Stores
    resources :stores, except: %i[index show]

    # States
    resources :states

    # Stock
    resources :stock_transfers, only: [:index, :show, :new, :create]
    resources :stock_locations do
      resources :stock_movements, except: [:edit, :update, :destroy]
      collection do
        post :transfer_stock
      end
    end
    resources :stock_items, only: [:create, :update, :destroy]

    # Store Credit
    resources :store_credit_categories

    # Tax
    resources :tax_rates
    resources :tax_categories

    # Taxonomies / Taxons
    resources :taxonomies do
      collection do
        post :update_positions
      end
      resources :taxons do
        member do
          delete :remove_icon
        end
      end
    end
    resources :taxons, only: [:index, :show]

    # Users
    resources :users do
      member do
        get :addresses
        put :addresses
        get :items
        get :orders
      end
      resources :store_credits
    end

    # Webhooks
    resources :webhooks_subscribers

    # Zones
    resources :zones
  end

  get Spree.admin_path, to: "admin/dashboard#show", as: :admin
end
