{
    "<%- prefix %>": {
		"scope": "<%- scope %>",
		"prefix": "<%- prefix %>",
		"body": [
    <% body.map(item => { -%>
        "<%- item %>",
    <% }) -%>
    ],
		"description": "<%- description %>"
	}
}