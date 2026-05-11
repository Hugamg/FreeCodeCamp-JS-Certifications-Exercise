function spinalCase(str) {

  return str

    // ÉTAPE 1 : Nettoyer les séparateurs en début, fin et milieu de chaîne
    // ^[\W_]+   → supprime les espaces/tirets/underscores en DÉBUT de chaîne
    // [\W_]+$   → supprime les espaces/tirets/underscores en FIN de chaîne
    // ([\W_]+)  → remplace les espaces/tirets/underscores au MILIEU par "-"
    // La fonction reçoit $0 (match complet) et $1 (groupe capturé du milieu)
    // Si $1 existe → on est au milieu → on met "-"
    // Si $1 n'existe pas → on est en début ou fin → on met ""
    .replace(/^[\W_]+|[\W_]+$|([\W_]+)/g, function($0, $1) {
      return $1 ? "-" : "";
    })

    // ÉTAPE 2 : Insérer un "-" aux frontières camelCase
    // ([a-z])   → capture une lettre minuscule
    // (?=[A-Z]) → vérifie (sans la consommer) qu'elle est suivie d'une majuscule
    // '$1-'     → réécrit la minuscule capturée + ajoute un tiret
    // Exemple : "helloWorld" → "hello-World"
    .replace(/([a-z])(?=[A-Z])/g, '$1-')

    // ÉTAPE 3 : Tout passer en minuscules
    // Exemple : "hello-World" → "hello-world"
    .toLowerCase();
}
