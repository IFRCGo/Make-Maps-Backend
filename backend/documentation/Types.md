## Typedefs

<dl>
<dt><a href="#DisasterSchema">DisasterSchema</a> : <code>Object</code></dt>
<dd><p>Defines a Mongoose schema for disasters.</p>
</dd>
<dt><a href="#DrawingLayer">DrawingLayer</a> : <code>Object</code></dt>
<dd><p>Defines a Mongoose schema for Drawing Layers.</p>
</dd>
<dt><a href="#PinSchema">PinSchema</a> : <code>object</code></dt>
<dd><p>Mongoose schema for Pins.</p>
</dd>
<dt><a href="#UserSchema">UserSchema</a> : <code>Object</code></dt>
<dd><p>Mongoose schema for user data.</p>
</dd>
</dl>

<a name="DisasterSchema"></a>

## DisasterSchema : <code>Object</code>
Defines a Mongoose schema for disasters.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| _id | <code>string</code> |  | Unique ID of the disaster |
| disasterName | <code>String</code> |  | The name of the disaster. |
| disasterType | <code>String</code> |  | The type of disaster. |
| date | <code>Date</code> |  | The date of the disaster. |
| region | <code>String</code> |  | The region where the disaster occurred. |
| [location] | <code>String</code> |  | The specific location of the disaster. e.g. Pakistan, UK |
| disasterCoordinates | <code>Object</code> |  | The coordinates of the disaster and type of coordinate. |
| disasterCoordinates.type | <code>String</code> |  | The type of coordinates, which should be "Point". |
| disasterCoordinates.coordinates | <code>Array.&lt;Number&gt;</code> |  | An array of latitude and longitude coordinates. |
| [disasterInformation] | <code>String</code> |  | Additional information about the disaster. |
| amount_requested | <code>String</code> |  | The amount of funding requested for the disaster. |
| amount_funded | <code>String</code> |  | The amount of funding received for the disaster. |
| createdBy | <code>mongoose.Schema.Types.ObjectId</code> |  | The user who created the disaster. |
| pins | <code>Array.&lt;mongoose.Schema.Types.ObjectId&gt;</code> |  | An array of Pin object IDs associated with the disaster. |
| drawingLayers | <code>Array.&lt;mongoose.Schema.Types.ObjectId&gt;</code> |  | An array of DrawingLayer object IDs associated with the disaster. |
| [lastSentEmail] | <code>Date</code> | <code>Date.now()</code> | The date when the last email about the disaster was sent. |
| subscriptions | <code>Array.&lt;mongoose.Schema.Types.ObjectId&gt;</code> |  | An array of User object IDs subscribed to the disaster. |
| [autoCreate] | <code>Boolean</code> | <code>true</code> | Whether to automatically create the collection in the database if it does not exist. |
| [timestamps] | <code>Boolean</code> | <code>true</code> | Whether to automatically add createdAt and updatedAt fields to the schema. |
| [collection] | <code>String</code> | <code>&#x27;Disaster&#x27;</code> | The name of the collection in the database. |

<a name="DrawingLayer"></a>

## DrawingLayer : <code>Object</code>
Defines a Mongoose schema for Drawing Layers.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _id | <code>mongoose.Schema.Types.ObjectId</code> | Unique ID of the drawing layer |
| disaster | <code>mongoose.Schema.Types.ObjectId</code> | ID of the disaster the drawing layer belongs to |
| createdBy | <code>mongoose.Schema.Types.ObjectId</code> | ID of the user who created the drawing layer |
| featureType | <code>string</code> | The type of the drawing feature (Polygon, MultiLineString, LineString) |
| featureGeoJSON | <code>Object</code> | The GeoJSON object representing the drawing feature |
| createdAt | <code>Date</code> | The date and time the drawing layer was created |
| updatedAt | <code>Date</code> | The date and time the drawing layer was last updated |

<a name="PinSchema"></a>

## PinSchema : <code>object</code>
Mongoose schema for Pins.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pinText | <code>string</code> | The text associated with the pin. |
| pinCoordinates | <code>Object</code> | The coordinates of the pin. |
| pinCoordinates.type | <code>string</code> | The type of the coordinates. |
| pinCoordinates.coordinates | <code>Array</code> | The coordinates. |
| createdBy | <code>mongoose.Schema.Types.ObjectId</code> | The user who created the pin. |

<a name="UserSchema"></a>

## UserSchema : <code>Object</code>
Mongoose schema for user data.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| firstName | <code>string</code> | The first name of the user. |
| lastName | <code>string</code> | The last name of the user. |
| email | <code>string</code> | The email of the user. |
| role | <code>string</code> | The role of the user (Admin or User). |

