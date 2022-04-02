<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class LocalEnviromentServiceProvider extends ServiceProvider
{
    /**
     * APP_ENV = localでのみ設定したいProviderのList.
     * @var array
     */
    protected $localProviders = [
        Barryvdh\Debugbar\ServiceProvider::class,
    ];

    /**
     * APP_ENV = localでのみ設定したいAliasesのList.
     * @var array
     */
    protected $facadeAliases = [
        'Debugbar' => Barryvdh\Debugbar\Facade::class,
    ];

    /**
     * 自動起動 services.
     */
    public function boot(): void
    {
        if ($this->app->isLocal()) {
            $this->registerServiceProviders();
            $this->registerFacadeAliases();
        }
    }

    /**
     * Register the application services.
     */
    public function register(): void
    {
    }

    /**
    * 追加で使用するserviceproviderをloadする
    * Base file providers load is /config/app.php => providers.
    */
    protected function registerServiceProviders(): void
    {
        foreach ($this->localProviders as $provider) {
            $this->app->register($provider);
        }
    }
    /**
     * 追加で使用するAliaseをロードする
     * Base file Alias load is /config/app.php => aliases.
     */
    public function registerFacadeAliases(): void
    {
        $loader = AliasLoader::getInstance();

        foreach ($this->facadeAliases as $alias => $facade) {
            $loader->alias($alias, $facade);
        }
    }


}
