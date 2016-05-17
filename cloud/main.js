// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function (request, response) {
    response.success("Bye world!");
});

var CervezaCheers = Parse.Object.extend("CervezaCheers");

// Garantiza cheers unicos en CervezaCheers
// Referencia: https://www.parse.com/questions/unique-fields--2
Parse.Cloud.beforeSave("CervezaCheers", function (request, response) {
    if (!request.object.get("cerveza") || !request.object.get("usuario")) {
        response.error('Un cheers debe tener cerveza y usuario.');
    } else {
        var query = new Parse.Query(CervezaCheers);
        query.equalTo("cerveza", request.object.get("cerveza"));
        query.equalTo("usuario", request.object.get("usuario"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("CervezaCheers", function (request) {
    var cervezaId = request.object.get("cerveza").id;
    var Cervezas = Parse.Object.extend("Cervezas");
    var query = new Parse.Query(Cervezas);
    query.get(cervezaId).then(function (cerveza) {
        cerveza.increment("cheers");
        cerveza.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("CervezaCheers", function (request) {
    var cervezaId = request.object.get("cerveza").id;
    var Cervezas = Parse.Object.extend("Cervezas");
    var query = new Parse.Query(Cervezas);
    query.get(cervezaId).then(function (cerveza) {
        cerveza.increment("cheers", -1);
        cerveza.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// FUNCIONES CHEERS CERVECERIAS
var CerveceriaCheers = Parse.Object.extend("CerveceriaCheers");

Parse.Cloud.beforeSave("CerveceriaCheers", function (request, response) {
    if (!request.object.get("idCerveceria") || !request.object.get("idUsuario")) {
        response.error('Un cheers debe tener una cerveceria y un usuario.');
    } else {
        var query = new Parse.Query(CerveceriaCheers);
        query.equalTo("idCerveceria", request.object.get("idCerveceria"));
        query.equalTo("idUsuario", request.object.get("idUsuario"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("CerveceriaCheers", function (request) {
    var cerveceriaId = request.object.get("idCerveceria").id;
    var Cerveceria = Parse.Object.extend("Cervecerias");
    var query = new Parse.Query(Cerveceria);
    query.get(cerveceriaId).then(function (cerveceria) {
        cerveceria.increment("cheers");
        cerveceria.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("CerveceriaCheers", function (request) {
    var cerveceriaId = request.object.get("idCerveceria").id;
    var Cervecerias = Parse.Object.extend("Cervecerias");
    var query = new Parse.Query(Cervecerias);
    query.get(cerveceriaId).then(function (cerveceria) {
        cerveceria.increment("cheers", -1);
        cerveceria.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// FUNCIONES CHEERS EVENTOS
var EventoCheers = Parse.Object.extend("EventoCheers");

Parse.Cloud.beforeSave("EventoCheers", function (request, response) {
    if (!request.object.get("evento") || !request.object.get("usuario")) {
        response.error('Un cheers debe tener un evento y un usuario.');
    } else {
        var query = new Parse.Query(EventoCheers);
        query.equalTo("evento", request.object.get("evento"));
        query.equalTo("usuario", request.object.get("usuario"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en eventos.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("EventoCheers", function (request) {
    var eventoId = request.object.get("evento").id;
    var eventos = Parse.Object.extend("Eventos");
    var query = new Parse.Query(eventos);
    query.get(eventoId).then(function (objEvento) {
        objEvento.increment("cheers");
        objEvento.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en eventos.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("EventoCheers", function (request) {
    var eventoId = request.object.get("evento").id;
    var eventos = Parse.Object.extend("Eventos");
    var query = new Parse.Query(eventos);
    query.get(eventoId).then(function (objEvento) {
        objEvento.increment("cheers", -1);
        objEvento.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// FUNCIONES CHEERS PROMOCIONES
var PromocionCheer = Parse.Object.extend("PromocionCheer");

Parse.Cloud.beforeSave("PromocionCheer", function (request, response) {
    if (!request.object.get("promocion") || !request.object.get("usuario")) {
        response.error('Un cheers debe tener una promocion y un usuario.');
    } else {
        var query = new Parse.Query(PromocionCheer);
        query.equalTo("usuario", request.object.get("usuario"));
        query.equalTo("promocion", request.object.get("promocion"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en promociones.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("PromocionCheer", function (request) {
    var promoId = request.object.get("promocion").id;
    var promociones = Parse.Object.extend("Promociones");
    var query = new Parse.Query(promociones);
    query.get(promoId).then(function (objPromo) {
        objPromo.increment("cheers");
        objPromo.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en promociones.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("PromocionCheer", function (request) {
    var promoId = request.object.get("promocion").id;
    var promociones = Parse.Object.extend("Promociones");
    var query = new Parse.Query(promociones);
    query.get(promoId).then(function (objPromo) {
        objPromo.increment("cheers", -1);
        objPromo.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// FUNCIONES CHEERS SAMPLERS
var SamplerCheer = Parse.Object.extend("SamplerCheer");

Parse.Cloud.beforeSave("SamplerCheer", function (request, response) {
    if (!request.object.get("sampler") || !request.object.get("usuario")) {
        response.error('Un cheers debe tener un sampler y un usuario.');
    } else {
        var query = new Parse.Query(SamplerCheer);
        query.equalTo("sampler", request.object.get("sampler"));
        query.equalTo("usuario", request.object.get("usuario"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en samplers.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("SamplerCheer", function (request) {
    var samplerId = request.object.get("sampler").id;
    var samplers = Parse.Object.extend("Samplers");
    var query = new Parse.Query(samplers);
    query.get(samplerId).then(function (objSampler) {
        objSampler.increment("cheers");
        objSampler.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en samplers.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("SamplerCheer", function (request) {
    var samplerId = request.object.get("sampler").id;
    var samplers = Parse.Object.extend("Samplers");
    var query = new Parse.Query(samplers);
    query.get(samplerId).then(function (objSampler) {
        objSampler.increment("cheers", -1);
        objSampler.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

//Funciones Cheers Rutas
var RutaCheers = Parse.Object.extend("RutaCheers");

// Garantiza cheers unicos en CervezaCheers
// Referencia: https://www.parse.com/questions/unique-fields--2
Parse.Cloud.beforeSave("RutaCheers", function (request, response) {
    if (!request.object.get("ruta") || !request.object.get("usuario")) {
        response.error('Un cheers debe tener ruta y usuario.');
    } else {
        var query = new Parse.Query(RutaCheers);
        query.equalTo("ruta", request.object.get("ruta"));
        query.equalTo("usuario", request.object.get("usuario"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("RutaCheers", function (request) {
    var rutaId = request.object.get("ruta").id;
    var Rutas = Parse.Object.extend("Rutas");
    var query = new Parse.Query(Rutas);
    query.get(rutaId).then(function (ruta) {
        ruta.increment("cheers");
        ruta.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("RutaCheers", function (request) {
    var rutaId = request.object.get("ruta").id;
    var Rutas = Parse.Object.extend("Rutas");
    var query = new Parse.Query(Rutas);
    query.get(rutaId).then(function (ruta) {
        ruta.increment("cheers", -1);
        ruta.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

//Funciones Cheers Publicaciones
var CheckInCheers = Parse.Object.extend("CheckInCheers");

// Garantiza cheers unicos en CheckInCheers
// Referencia: https://www.parse.com/questions/unique-fields--2
Parse.Cloud.beforeSave("CheckInCheers", function (request, response) {
    if (!request.object.get("CheckIn") || !request.object.get("usuario")) {
        response.error('Un cheers debe tener un CheckIn y un usuario.');
    } else {
        var query = new Parse.Query(CheckInCheers);
        query.equalTo("CheckIn", request.object.get("CheckIn"));
        query.equalTo("usuario", request.object.get("usuario"));
        query.first({
            success: function (object) {
                if (object) {
                    response.error("El usuario ya ha dado cheers anteriormente");
                } else {
                    response.success();
                }
            },
            error: function (error) {
                response.error("No se pudo verificar si el usuario ya dio cheers");
            }
        });
    }
});

// Incrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterSave("CheckInCheers", function (request) {
    var checkInId = request.object.get("CheckIn").id;
    var CheckIns = Parse.Object.extend("CheckIns");
    var query = new Parse.Query(CheckIns);
    query.get(checkInId).then(function (checkIn) {
        checkIn.increment("Cheers");
        checkIn.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Decrementa el contador de cheers en Cervezas.
// Referencia: https://parse.com/docs/js/guide#performance-avoid-count-operations
Parse.Cloud.afterDelete("CheckInCheers", function (request) {
    var checkInId = request.object.get("CheckIn").id;
    var CheckIns = Parse.Object.extend("CheckIns");
    var query = new Parse.Query(CheckIns);
    query.get(checkInId).then(function (checkIn) {
        checkIn.increment("Cheers", -1);
        checkIn.save();
    }, function (error) {
        throw "Got an error " + error.code + " : " + error.message;
    });
});

// Maneja toda la lógica de un Check In
Parse.Cloud.define("ProcessCheckIn", function (request, response) {
    if ((!request.params.idCerveza && !request.params.homebrew) || !request.params.userId) {
        response.error('Publicar un Check In requiere al menos una cerveza y un usuario.');
    } else {
        var homebrew = request.params.homebrew;

        var Beer = Parse.Object.extend("Cervezas");
        var beer = undefined;
        if (!homebrew) {
            // This avoids the creation of an empty beer
            beer = new Beer();
            beer.id = request.params.idCerveza;
        }

        var User = Parse.Object.extend("User");
        var user = new User();
        user.id = request.params.userId;

        var Bar = Parse.Object.extend("Bares");
        var bar = new Bar();
        bar.id = request.params.barId;

        var BarMenu = Parse.Object.extend("BarMenu");
        var barMenu = new BarMenu();

        var UserBeer = Parse.Object.extend("UserBeer");

        saveCheckIn()
            .then(!homebrew ? findOlderUserBeer : function () {
                // If check in was saved, but homebrew is enabled,
                // just return a success. No further processing is required.
                response.success("Check in saved.");
            }, function (data, error) {
                // Could not save Check In
                response.error("Could not save checkIn");
            })
            .then(saveUserBeer)
            .then(findBarMenu)
            .then(updateBarMenu)
            .then(function () {
                if (!request.params.userRating) {
                    // Rating is not mentioned in this check in, the rest is not required
                    response.success("Check in saved.");
                }
            })
            .then(fetchBeer)
            .then(updateBeerRatingCache)
            .then(function (data) {
                response.success("User rating saved.");
            }, function (data, error) {
                response.error(error.message);
            });

        function findBarMenu () {
            if (request.params.barId) {
                var barMenuQuery = new Parse.Query(BarMenu);
                barMenuQuery.equalTo("beer", beer);
                barMenuQuery.equalTo("bar", bar);
                return barMenuQuery.first();
            } else {
                return false;
            }
        }

        function updateBarMenu (barMenu) {
            if (barMenu === false) {
                return;
            }

            if (!barMenu) {
                // New relation, create it
                barMenu = new BarMenu();
                barMenu.set("beer", beer);
                barMenu.set("bar", bar);
            }

            barMenu.set("lastCheckin", request.params.fecha);
            return barMenu.save(null);
        }

        function saveCheckIn () {
            // Check In data
            var CheckIns = Parse.Object.extend("CheckIns");
            var checkIn = new CheckIns();

            if (request.params.imageUrl != null) {
                checkIn.set("imageUrl", request.params.imageUrl);
            }

            if (request.params.barId) {
                checkIn.set("bar", bar);
                bar.increment("countCheckins", 1);
            }

            if (request.params.beerName) {
                checkIn.set("beerName", request.params.beerName);
            }
            checkIn.set("fecha", request.params.fecha);
            checkIn.set("usuario", user);
            checkIn.set("comentario", request.params.text);
            checkIn.set("cerveza", homebrew ? undefined : beer);
            checkIn.set("Cheers", 0);
            checkIn.set("hidden", false);
            checkIn.set("rating", request.params.userRating);
            checkIn.set("isHomebrew", homebrew);
            if(!homebrew){
                beer.increment("countCheckins", 1);
            }
            return checkIn.save(null);
        }

        function findOlderUserBeer () {
            var query = new Parse.Query(UserBeer);
            query.equalTo("usuario", user);
            query.equalTo("cerveza", beer);
            return query.first();
        }

        function saveUserBeer (oldUserBeer) {
            // User already had same beer
            if (oldUserBeer) {
                // Rating give, update it
                if (request.params.userRating) {
                    ratingUpdated = true;
                    olderRating = oldUserBeer.get('rating');
                    oldUserBeer.set('rating', request.params.userRating);
                }
                // If rating not given, just save to store updated date
                return oldUserBeer.save(null);
            } else {
                // User haven't had same beer, save object
                var userBeer = new UserBeer();
                userBeer.set("cerveza", beer);
                userBeer.set("usuario", user);
                if (request.params.userRating) {
                    userBeer.set("rating", request.params.userRating);
                }
                return userBeer.save(null);
            }
        }

        function fetchBeer () {
            return beer.fetch();
        }

        function updateBeerRatingCache (fetchedBeer) {
            var currentRating = fetchedBeer.get('rating');
            var currentRCount = fetchedBeer.get('cantRating');
            var givenRating   = request.params.userRating;

            var newRCount = currentRCount + 1;
            var newRating = ((currentRating * currentRCount) + givenRating) / newRCount;

            fetchedBeer.set('rating', newRating);
            fetchedBeer.set('cantRating', newRCount);
            return fetchedBeer.save(null);
        }
    }
});

Parse.Cloud.define("deleteUser", function(request, response) {
    Parse.Cloud.useMasterKey();
    var query = new Parse.Query(Parse.User);
    query.get(request.params.objectId, {
        success: function(user) {
            user.destroy({
                success: function() {
                    response.success('User deleted');
                },
                error: function(error) {
                    response.error(error);
                }
            });
        },
        error: function(error) {
            response.error(error);
        }
    });


})