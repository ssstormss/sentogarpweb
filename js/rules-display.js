// Lädt die Regeln aus dem LocalStorage oder verwendet Standard-Demo-Regeln
document.addEventListener('DOMContentLoaded', function() {
    // Standard-Demo-Regeln
    const demoRules = [
        {
            id: '1',
            section: 'Allgemeine Regeln',
            rule: 'Respektiere alle Spieler und Staff-Mitglieder. Beleidigungen und Diskriminierung werden nicht toleriert.'
        },
        {
            id: '2',
            section: 'Allgemeine Regeln',
            rule: 'Das Ausnutzen von Spielfehlern (Glitches oder Bugs) ist strengstens verboten und wird mit einem permanenten Bann bestraft.'
        },
        {
            id: '3',
            section: 'Roleplay Regeln',
            rule: 'No Random Death Match (RDM) - Töte keine Spieler ohne vorherige Roleplay-Interaktion.'
        },
        {
            id: '4',
            section: 'Roleplay Regeln',
            rule: 'No Vehicle Death Match (VDM) - Fahrzeuge dürfen nicht als Waffe verwendet werden.'
        },
        {
            id: '5',
            section: 'Kommunikation',
            rule: 'Verwende den In-Game-Voice-Chat für Kommunikation in der Nähe. Für Telefonate sind entsprechende Rollenspiel-Aktionen erforderlich.'
        }
    ];

    // Elemente aus dem DOM holen
    const rulesContainer = document.getElementById('rulesContainer');
    const noRulesMessage = document.getElementById('noRulesMessage');
    
    if (rulesContainer) {
        // Lade Regeln aus dem LocalStorage oder verwende Demo-Regeln
        let rules = JSON.parse(localStorage.getItem('rules') || '[]');
        
        // Wenn keine Regeln vorhanden sind, verwende die Demo-Regeln
        if (rules.length === 0) {
            rules = demoRules;
            // Speichere Demo-Regeln im LocalStorage
            localStorage.setItem('rules', JSON.stringify(demoRules));
        }
        // Regeln-Container leeren
        rulesContainer.innerHTML = '';
        
        // Regeln nach Abschnitten gruppieren
        const sections = {};
        rules.forEach(rule => {
            if (!sections[rule.section]) {
                sections[rule.section] = [];
            }
            sections[rule.section].push(rule.rule);
        });
        
        // Abschnitte anzeigen
        for (const section in sections) {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'rule-section';
            
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section;
            sectionElement.appendChild(sectionTitle);
            
            const ruleList = document.createElement('ol');
            ruleList.className = 'rule-list';
            
            sections[section].forEach(ruleText => {
                const ruleItem = document.createElement('li');
                ruleItem.textContent = ruleText;
                ruleList.appendChild(ruleItem);
            });
            
            sectionElement.appendChild(ruleList);
            rulesContainer.appendChild(sectionElement);
        }
    }
});
