import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="max-w-4xl mx-auto bg-base-100 p-3 rounded-lg shadow-lg print:bg-transparent print:shadow-none">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
        <!-- Left side (Name, Address, Title) -->
        <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-primary">{{nom}}</h1>
            <h3 class="text-x font-bold text-secondary">{{titre}}</h1>
            <p class="text-sm">{{adresse}}</p>
        </div>

        <!-- Right side (Email, LinkedIn, Phone, Languages) -->
        <div class="text-right">
            <p class="text-sm">{{email}}</p>
            <p class="text-sm">
                <a href="{{linkedin}}" class="text-primary">LinkedIn</a>
            </p>
            <p class="text-sm">{{tel}}</p>
            <p class="text-sm">
                {{#each languages}}
                    {{this}}{{#unless @last}}, {{/unless}}
                {{/each}}
            </p>
        </div>
    </div>

    <!-- Présentation -->
    <h2 class="text-xl font-semibold mt-6 text-secondary mb-1">À propos</h2>
    {{#each presentation}}
        <p class="text-sm">{{this}}</p>
    {{/each}}

    <!-- Formations -->
    <h2 class="text-xl font-semibold mt-6 text-secondary mb-1">Formations</h2>
    <div class="space-y-2">
        {{#each formation}}
            <div class="bg-base-200 p-6 rounded-lg shadow-md border border-base-300">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-primary">{{ecole}}</h3>
                    <p class="text-sm text-base-content bg-center">📍 {{location}}</p>
                </div>
                <div class="mt-4 space-y-4">
                    {{#each items}}
                        <!-- Border around each poste -->
                        <div class="border-t-2 border-base-300 pt-4">
                            <div class="flex items-center justify-between">
                                <h4 class="font-bold text-base-content text-secondary">{{info}}</h4>
                                <p class="text-sm text-base-content bg-center">
                                    {{#if date_debut}}
                                        🗓️ {{date_debut}} - {{date_fin}}
                                    {{else}}
                                        🗓️ {{date_fin}}
                                    {{/if}}
                                </p>
                            </div>
                            <ul class="list-disc pl-5 mt-2 text-sm text-base-content">
                                {{#each description}}
                                    <li>{{this}}</li>
                                {{/each}}
                            </ul>
                        </div>
                    {{/each}}
                </div>
            </div>
        {{/each}}
    </div>

    <!-- Compétences -->
    <h2 class="text-xl font-semibold mt-6 text-secondary mb-1">Compétences</h2>
    <div class="flex flex-wrap gap-2">
        {{#each competences}}
            <span class="badge badge-accent">{{this}}</span>
        {{/each}}
    </div>

    <!-- Compétences -->
    <h2 class="text-xl font-semibold mt-6 text-secondary mb-1">Compétences</h2>
    <div class="flex flex-wrap gap-2">
        {{#each language_code}}
            <span class="badge badge-accent">{{this}}</span>
        {{/each}}
    </div>

    <!-- Expériences -->
    <h2 class="text-xl font-semibold mt-6 text-secondary mb-1">Expériences</h2>
    <div class="space-y-2">
        {{#each experiences}}
            <div class="bg-base-200 p-6 rounded-lg shadow-md border border-base-300">
                <!-- Logo & Nom Entreprise -->
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img src="{{image}}" alt="{{entreprise}}" class="w-12 h-12 rounded-md">
                        <h3 class="text-lg font-semibold text-primary">{{entreprise}}</h3>
                    </div>
                    <p class="text-sm text-base-content bg-center">📍 {{location}}</p>
                </div>
                <div class="mt-4 space-y-4">
                    {{#each postes}}
                        <!-- Border around each poste -->
                        <div class="border-t-2 border-base-300 pt-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <h4 class="font-bold text-base-content text-secondary">{{poste}}</h4>
                                    <p class="text-sm">({{type}})</p>
                                </div>
                                <p class="text-sm text-base-content bg-center">🗓️ {{date_debut}} - {{date_fin}}</p>
                            </div>
                            <ul class="list-disc pl-5 mt-2 text-sm text-base-content">
                                {{#each description}}
                                    <li>{{this}}</li>
                                {{/each}}
                            </ul>
                        </div>
                    {{/each}}
                </div>
            </div>
        {{/each}}
    </div>



</div>

<!-- Bouton d'impression -->
<div class="flex justify-center mt-6 btn-primary print:hidden">
    <button id="generate" class="btn btn-primary">Generate PDF</button>
</div>
`

setupCounter(document.querySelector('#counter'))
