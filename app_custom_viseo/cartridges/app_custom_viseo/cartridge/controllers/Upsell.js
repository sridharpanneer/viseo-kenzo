/* API Includes */

var server = require('server');
var ProductMgr = require('dw/catalog/ProductMgr');
var ContentMgr = require('dw/content/ContentMgr');
var XMLStreamReader = require('dw/io/XMLStreamReader');
var Reader = require('dw/io/Reader');
var XMLStreamConstants = require('dw/io/XMLStreamConstants');
var Logger = require('dw/system/Logger');

server.get('Initialize', function (req, res, next) {
  var content;
  if (req.querystring.hasOwnProperty('content')) {
    content = req.querystring.content.toString();;
    content = '<?xml version="1.0" encoding="UTF-8"?><contents>' + content.replace(/\n+/g, '') + '</contents>';

    var responseReader = new Reader(content);
    var XmlContentReader = new XMLStreamReader(responseReader);
    var xmlObject;

    while (XmlContentReader.hasNext()) {
        if (XmlContentReader.next() == XMLStreamConstants.START_ELEMENT) {
            xmlObject = XmlContentReader.readXMLObject();
            if (xmlObject.children().length() > 0) {
                var nodeValue, 
                nodeName, 
                ContentAsset, 
                calloutMsgAsset, 
                lien, 
                assetAttribute, 
                calloutMsg, 
                eid;

                for (var i = 0; i < xmlObject.children().length(); i++) {
                nodeValue = xmlObject.child(i);
                nodeName = nodeValue.name();
                assetAttribute = nodeValue.attribute('asset');
                calloutMsgAsset = !empty(assetAttribute) ? ContentMgr.getContent(assetAttribute) : '';
                calloutMsg = !empty(calloutMsgAsset) ? calloutMsgAsset.custom.body : '';
                ContentAsset = ContentMgr.getContent(nodeValue.toString());
                lien = '';

                if (!empty(nodeName)) {
                    switch (nodeName.localName) {
                        
                        case 'slider':
                                    try {
                                        var Products = [];
                                        var ProductsID = (nodeValue.toString()).split('|');

                                        for (var j = 0; j < ProductsID.length; j++) {
                                            Products.push(ProductMgr.getProduct(ProductsID[j]));
                                        }
                                        res.render('slots/content/templates/mozaic-display', { Products: Products, calloutMsg: calloutMsg });
                                        next();
                                    } catch (e) {
                                        Logger.warn("Upsell-RetreiveContent : Slider - Error while parsing XML");
                                    }
                            break;

                        case 'mozaic':
                            try {
                                res.render('slots/content/templates/mozaic-display', { ContentAsset: ContentAsset , calloutMsg: calloutMsg });
                                next();
                            } catch (e) {
                                Logger.warn('Upsell-RetreiveContent : Mozaic - Error while parsing XML');
                            }
                            break;

                        default:
                            break;

                        }
                    }
                }

                delete xmlObject, nodeValue, nodeName, content;
            }
        }
      }

    XmlContentReader.close();
    responseReader.close();
  }
});


module.exports = server.exports();