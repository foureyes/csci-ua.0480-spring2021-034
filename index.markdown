---
layout: default
nav-state: index
---



<!--
<h1>AIT Test Deploy</h1>
-->



<div id="quick-links">
<h3><a href="syllabus.html">Course Info</a> | <a href="{{ site.vars.forum }}">Forum</a> | <a href="syllabus.html#tutoring">Tutoring</a> | <a href="syllabus.html#hw-policy">Homework Policy</a> | <a href="syllabus.html#quiz-policy">Quiz Policy</a></h3>
</div>
<table class="table table-striped table-hover">
<thead>
<tr>
	<th>Date</th> <th>Topics</th> <th>Slides</th> <th>Readings</th>
	<th>Assignments</th>
</tr>
</thead>
<tbody>

{% for c in site.data.ait-schedule %}

<tr name="class{{c.num}}" id="class{{c.num}}" class="{% if c.type == 'holiday' %}success {% endif %}{% if c.type == 'exam' %}danger {% endif %}">
	<td class="date-col">{% unless c.type == 'holiday' %}#{{ c.num }}{% endunless %}<div class="date">{{ c.date | replace: '-', ' ' | markdownify}}</div>{{c.day}}</td>

	{% if c.draft %}
		<td markdown="block">{{ c.topics | remove: '__new__' | markdownify }}</td>
		<td markdown="block"></td>
		<td markdown="block"></td>
		<td markdown="block"></td>
	{% else %}
		{% if c.type == 'holiday' or c.type == 'exam' %}
		<td class="noclass" colspan="4" markdown="block">{{ c.topics | remove: '__new__' | markdownify }}</td>
		{% else %}
		<td markdown="block">{{ c.topics | remove: '__new__' | markdownify }}</td>
		<td markdown="block">{{ c.slides |  markdownify }}</td>
		<td markdown="block">{{ c.readings | markdownify }}</td>
		<td markdown="block">{{ c.assignments | markdownify }}</td>
		{% endif %}
	{% endif %}
</tr>
{% endfor %}

</tbody>
</table>

<script>
// handle jekyll site variables in data file
// (liquid variables in data files like csvs and yml are not processed)
function processSiteVars() {

	const config = {};
	
	/*
	config contains site variables from config.yml
	...only variables under site.vars are included
	*/
	{% for obj in site.vars %}
	config["{{ obj[0] }}"] = `{{ obj[1] }}`;
	{% endfor %}
	
	const re = /(site\.\w*)/g  
	const table = document.querySelector('table');

	console.log(table);
	const result = table.innerHTML.match(re);
	console.log(result);
	for(const s of result) {
		const k = s.replace('site.', '');
		{% raw %}
		table.innerHTML = table.innerHTML.replace(new RegExp('{{ ' + s + ' }}', 'g'), config[k]);
		{% endraw %}
	}
	
	// console.log(config);
}

document.addEventListener('DOMContentLoaded', processSiteVars);
</script>

<style>
.noclass {
	text-align: center;
	font-weight: bold;
	color: #115522;
}

.date-col {
	text-align: center;
}

.date {
	border: 1px solid #ccc;
	font-weight: bold;
	color: #115522;
	text-align: center;
	padding: 0.25em;
	margin: 0.25em;
	/*
	padding-top: 0.25em;
	padding-bottom: 0.25em;
	padding-left: 0.25em;
	padding-right: 0.25em;
	*/
}

td:nth-child(3) {
	width: 30%;
}

td:nth-child(4) {
	width: 35%;
}

#schedule {
	display: grid;
	grid-template-columns: 1fr 4fr 6fr 6fr 3fr
}

ul {
	padding-left: 20px;
}
</style>
<!--
<style>
#schedule {
	display: grid;
	grid-template-columns: 1fr 2fr 4fr 6fr 6fr 5fr
}
</style>
-->
