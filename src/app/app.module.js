"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var user_module_1 = require("../user/user.module");
var config_1 = require("@nestjs/config");
var configurations_1 = require("../configurations");
var sequelize_1 = require("@nestjs/sequelize");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    load: [configurations_1["default"]]
                }),
                sequelize_1.SequelizeModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        dialect: "postgres",
                        host: configService.get('db_host'),
                        port: configService.get('db_port'),
                        username: configService.get('db_user'),
                        password: configService.get('db_password'),
                        database: configService.get('db_database'),
                        synchronize: true,
                        autoLoadModels: true,
                        models: []
                    }); }
                }),
                user_module_1.UserModule],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
