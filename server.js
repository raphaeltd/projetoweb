// BASE SETUP
// =============================================================================



// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app        = express();
var morgan     = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//CONFIGURA CABEÇALHO
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header("Access-Control-Allow-Origin", "http://localhost:8888/operadores/");
  // res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  // res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "1728000");
  next();
});


// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// MONGODB CONEXÃO
// =============================================================================
var port     = process.env.PORT || 8080; // set our port
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
var Bear     = require('./app/models/bear');



// MYSQL CONEXÃO
// =============================================================================
var sql = require("seriate");
// Change the config settings to match your 
// SQL Server and database
var config = {  
    // "server": "10.0.0.31",
    "server": "177.68.158.112",
    "user": "sa",
    "password": "freicaneca",
    "database": "tesis_gerencial"
};
sql.setDefaultConfig( config );
//


// ROTAS PARA API TSCOBRA
// =============================================================================
app.get('/', function(req, res, next) {
  // Handle the get for this route
});

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res, next) {
  res.json({ message: 'TSCOBRA! api na Rolando na Alta!' }); 

});

router.get('/carteiras', function(req, res) {
  return sql.execute( {  
          // query: "relatorio_de_operadores_por_periodo  '2015-09-01','2015-10-02','mestre'"
          
          query: "select  ce.dt_posicao as dataPosicao,  ce.id_grupo as idGrupo, g.nom_grupo as grupo, ce.id_cgc_empresa as cnpjEmpresa, e.nom_abrev as empresa, ce.id_Carteira as idCarteira, c.dsc_cart_empresa as carteira, ce.id_faixa as idFaixa, f.dsc_faixa as faixa, ce.qtd_contrato_ab  as qtdContratoAberto from carteira_por_empresa as ce inner join empresas e on e.id_cgc_empresa = ce.id_cgc_empresa inner join carteiras c on c.id_cgc_empresa = ce.id_cgc_empresa and c.id_Carteira = ce.id_Carteira inner join faixas_de_atraso f on f.id_faixa = ce.id_faixa inner join grupos_financeiros g on g.id_grupo = ce.id_grupo  "
      } ).then( function( results ) {
          res.json(results);
      }, function( err ) {
          console.log( "ERRO no TSCOBRA Operadores:", err );
      } );
  
});

router.get('/contratosporcarteiras', function(req, res) {
  return sql.execute( {  
          
          // query: "relatorio_de_operadores_por_periodo  '2015-09-01','2015-10-02','mestre'"
          // query: " select ce.dt_posicao as dataPosicao, ce.id_grupo as idGrupo, max(g.nom_grupo) as grupo, ce.id_cgc_empresa as cnpjEmpresa, max(e.nom_empresa) as empresa, ce.id_Carteira as idCarteira, max(c.dsc_cart_empresa) as carteira, ce.id_faixa as idFaixa, max(f.dsc_faixa) as faixa, qtdContratoAberto = sum(ce.qtd_contrato_st + ce.qtd_contrato_sj + ce.qtd_contrato_sf + ce.qtd_contrato_ea  + ce.qtd_contrato_ab )   from carteira_por_empresa as ce inner join empresas e on e.id_cgc_empresa = ce.id_cgc_empresa inner join carteiras c on c.id_cgc_empresa = ce.id_cgc_empresa and c.id_Carteira = ce.id_Carteira inner join faixas_de_atraso f on f.id_faixa = ce.id_faixa inner join grupos_financeiros g on g.id_grupo = ce.id_grupo where ce.id_grupo = '0002' group by ce.dt_posicao, ce.id_grupo, ce.id_cgc_empresa, ce.id_carteira, ce.id_faixa WITH CUBE "
          // query: " select ce.dt_posicao as dataPosicao, ce.id_grupo as idGrupo, max(g.nom_grupo) as grupo, ce.id_cgc_empresa as cnpjEmpresa, max(e.nom_empresa) as empresa, ce.id_Carteira as idCarteira, max(c.dsc_cart_empresa) as carteira, ce.id_faixa as idFaixa, max(f.dsc_faixa) as faixa, qtdContratoAberto = sum(ce.qtd_contrato_st + ce.qtd_contrato_sj + ce.qtd_contrato_sf + ce.qtd_contrato_ea  + ce.qtd_contrato_ab ), vlrAbertoAVencer = sum(ce.vlr_ab_avencer_st + ce.vlr_ab_avencer_sj + ce.vlr_ab_avencer_sf + ce.vlr_ab_avencer_ea + ce.vlr_ab_avencer_ab)     from carteira_por_empresa as ce inner join empresas e on e.id_cgc_empresa = ce.id_cgc_empresa inner join carteiras c on c.id_cgc_empresa = ce.id_cgc_empresa and c.id_Carteira = ce.id_Carteira inner join faixas_de_atraso f on f.id_faixa = ce.id_faixa inner join grupos_financeiros g on g.id_grupo = ce.id_grupo group by ce.dt_posicao, ce.id_grupo, ce.id_cgc_empresa , ce.id_carteira, ce.id_faixa WITH CUBE "
          // query: "select * from teste_gerencial where idFaixa is not null and idFaixa <> 11 and idFaixa <> 10"


          // select 
          // id_sequencial as idSequencial, 
          // dt_posicao as dataPosicao, 
          // id_grupo as idGrupo, 
          // nom_grupo as grupo, 
          // id_cgc_empresa as cnpjEmpresa, 
          // nom_abrev as empresa, 
          // id_carteira as idCarteira, 
          // dsc_cart_empresa as carteira, 
          // id_faixa as idFaixa, 
          // dsc_faixa as faixa, 

          // qtd_contrato_todos as qtdContratoTodos, 
          // vlr_vencido_todos as vlrVencidoTodos, 
          // vlr_avencer_todos as vlrAvencerTodos, 

          // qtd_contrato_ab as qtdContratoAberto, 
          // vlr_ab_vencido_ab as vlrAbertoVencidos, 
          // vlr_ab_avencer_ab as vlrAbertoAvencer, 


          // qtd_contrato_ea as qtdContratoEntregaAmigavel, 
          // vlr_ab_vencido_ea as vlrVencidoEntregaAmigavel, 
          // vlr_ab_avencer_ea as vlrAvencerEntregaAmigavel, 

          // qtd_contrato_st as qtdContratoSuspensaoTemporaria, 
          // vlr_ab_vencido_st as vlrVencidoSuspensaoTemporaria, 
          // vlr_ab_avencer_st as vlrAvencerSuspensaoTemporaria, 

          // qtd_contrato_sf as qtdContratoSuspensaoFinanceira,  
          // vlr_ab_vencido_sf as vlrVencidosSuspensaoFinanceira,   
          // vlr_ab_avencer_sf as vlrAvencerSuspensaoFinanceira,  

          // qtd_contrato_sj as qtdContratoSuspensaoJuridica,  
          // vlr_ab_vencido_sj as vlrVencidosSuspensaoJuridica,  
          // vlr_ab_avencer_sj as vlrAvencerSuspensaoJuridica,

          // qtd_contrato_fc as qtdContratoFechado,  
          // vlr_vencido_fc as vlrVencidosFechado,  
          // vlr_avencer_fc as vlrAvencerFechado
            

          // from teste_gerencial


          query: "select id_sequencial as idSequencial, dt_posicao as dataPosicao, id_grupo as idGrupo, nom_grupo as grupo, id_cgc_empresa as cnpjEmpresa, nom_abrev as empresa, id_carteira as idCarteira, dsc_cart_empresa as carteira, id_faixa as idFaixa, dsc_faixa as faixa, qtd_contrato_todos as qtdContratoTodos, vlr_vencido_todos as vlrVencidoTodos, vlr_avencer_todos as vlrAvencerTodos, qtd_contrato_ab as qtdContratoAberto, vlr_ab_vencido_ab as vlrAbertoVencidos, vlr_ab_avencer_ab as vlrAbertoAvencer, qtd_contrato_ea as qtdContratoEntregaAmigavel, vlr_ab_vencido_ea as vlrVencidoEntregaAmigavel, vlr_ab_avencer_ea as vlrAvencerEntregaAmigavel, qtd_contrato_st as qtdContratoSuspensaoTemporaria, vlr_ab_vencido_st as vlrVencidoSuspensaoTemporaria, vlr_ab_avencer_st as vlrAvencerSuspensaoTemporaria, qtd_contrato_sf as qtdContratoSuspensaoFinanceira,  vlr_ab_vencido_sf as vlrVencidosSuspensaoFinanceira,   vlr_ab_avencer_sf as vlrAvencerSuspensaoFinanceira,  qtd_contrato_sj as qtdContratoSuspensaoJuridica,  vlr_ab_vencido_sj as vlrVencidosSuspensaoJuridica,  vlr_ab_avencer_sj as vlrAvencerSuspensaoJuridica, qtd_contrato_fc as qtdContratoFechado, vlr_vencido_fc as vlrVencidosFechado, vlr_avencer_fc as vlrAvencerFechado  from teste_gerencial where dt_posicao = '2015-09-20'"

      } ).then( function( results ) {
          res.json(results);
      }, function( err ) {
          console.log( "ERRO no TSCOBRA Operadores:", err );
      } );
  
});

// REGISTER OUR ROUTES -------------------------------

app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Servidor TSCOBRA no ar na porta: ' + port);
