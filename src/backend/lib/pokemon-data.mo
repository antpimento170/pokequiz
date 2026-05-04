import Types "../types/quiz";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

module {
  // A representative dataset of Pokemon across all 9 generations.
  // Each entry: { id, name, types, generation, moves, abilities }
  let DATA : [Types.PokemonEntry] = [
    // Gen 1
    { id = 1;   name = "Bulbasaur";   types = ["Grass", "Poison"]; generation = 1; moves = ["Tackle", "Vine Whip", "Razor Leaf", "Solar Beam"]; abilities = ["Overgrow"] },
    { id = 2;   name = "Ivysaur";     types = ["Grass", "Poison"]; generation = 1; moves = ["Vine Whip", "Razor Leaf", "Sleep Powder", "Solar Beam"]; abilities = ["Overgrow"] },
    { id = 3;   name = "Venusaur";    types = ["Grass", "Poison"]; generation = 1; moves = ["Razor Leaf", "Solar Beam", "Synthesis", "Petal Dance"]; abilities = ["Overgrow", "Chlorophyll"] },
    { id = 4;   name = "Charmander";  types = ["Fire"];            generation = 1; moves = ["Scratch", "Ember", "Flamethrower", "Fire Spin"]; abilities = ["Blaze"] },
    { id = 5;   name = "Charmeleon";  types = ["Fire"];            generation = 1; moves = ["Ember", "Flamethrower", "Slash", "Fire Blast"]; abilities = ["Blaze"] },
    { id = 6;   name = "Charizard";   types = ["Fire", "Flying"];  generation = 1; moves = ["Flamethrower", "Fire Blast", "Dragon Claw", "Wing Attack"]; abilities = ["Blaze", "Solar Power"] },
    { id = 7;   name = "Squirtle";    types = ["Water"];           generation = 1; moves = ["Tackle", "Water Gun", "Bubble", "Hydro Pump"]; abilities = ["Torrent"] },
    { id = 8;   name = "Wartortle";   types = ["Water"];           generation = 1; moves = ["Water Gun", "Bite", "Protect", "Aqua Tail"]; abilities = ["Torrent"] },
    { id = 9;   name = "Blastoise";   types = ["Water"];           generation = 1; moves = ["Hydro Pump", "Water Pulse", "Ice Beam", "Flash Cannon"]; abilities = ["Torrent", "Rain Dish"] },
    { id = 25;  name = "Pikachu";     types = ["Electric"];        generation = 1; moves = ["Thunderbolt", "Quick Attack", "Iron Tail", "Thunder"]; abilities = ["Static", "Lightning Rod"] },
    { id = 26;  name = "Raichu";      types = ["Electric"];        generation = 1; moves = ["Thunderbolt", "Thunder", "Agility", "Slam"]; abilities = ["Static", "Lightning Rod"] },
    { id = 39;  name = "Jigglypuff";  types = ["Normal", "Fairy"]; generation = 1; moves = ["Sing", "Pound", "Body Slam", "Hyper Voice"]; abilities = ["Cute Charm", "Competitive"] },
    { id = 52;  name = "Meowth";      types = ["Normal"];          generation = 1; moves = ["Scratch", "Bite", "Pay Day", "Fury Swipes"]; abilities = ["Pickup", "Technician"] },
    { id = 54;  name = "Psyduck";     types = ["Water"];           generation = 1; moves = ["Scratch", "Water Gun", "Confusion", "Psychic"]; abilities = ["Damp", "Cloud Nine"] },
    { id = 63;  name = "Abra";        types = ["Psychic"];         generation = 1; moves = ["Teleport", "Psybeam", "Psychic", "Future Sight"]; abilities = ["Synchronize", "Inner Focus"] },
    { id = 66;  name = "Machop";      types = ["Fighting"];        generation = 1; moves = ["Karate Chop", "Low Kick", "Cross Chop", "Submission"]; abilities = ["Guts", "No Guard"] },
    { id = 74;  name = "Geodude";     types = ["Rock", "Ground"];  generation = 1; moves = ["Tackle", "Rock Throw", "Rollout", "Earthquake"]; abilities = ["Rock Head", "Sturdy"] },
    { id = 94;  name = "Gengar";      types = ["Ghost", "Poison"]; generation = 1; moves = ["Shadow Ball", "Hypnosis", "Dream Eater", "Sludge Bomb"]; abilities = ["Cursed Body"] },
    { id = 131; name = "Lapras";      types = ["Water", "Ice"];    generation = 1; moves = ["Surf", "Ice Beam", "Psychic", "Thunderbolt"]; abilities = ["Water Absorb", "Shell Armor"] },
    { id = 143; name = "Snorlax";     types = ["Normal"];          generation = 1; moves = ["Tackle", "Body Slam", "Rest", "Hyper Beam"]; abilities = ["Immunity", "Thick Fat"] },
    { id = 144; name = "Articuno";    types = ["Ice", "Flying"];   generation = 1; moves = ["Ice Beam", "Blizzard", "Mind Reader", "Sheer Cold"]; abilities = ["Pressure", "Snow Cloak"] },
    { id = 145; name = "Zapdos";      types = ["Electric", "Flying"]; generation = 1; moves = ["Thunderbolt", "Thunder", "Drill Peck", "Agility"]; abilities = ["Pressure", "Static"] },
    { id = 146; name = "Moltres";     types = ["Fire", "Flying"];  generation = 1; moves = ["Flamethrower", "Fire Blast", "Sky Attack", "Agility"]; abilities = ["Pressure", "Flame Body"] },
    { id = 149; name = "Dragonite";   types = ["Dragon", "Flying"]; generation = 1; moves = ["Dragon Claw", "Hyper Beam", "Fire Punch", "Thunder Wave"]; abilities = ["Inner Focus", "Multiscale"] },
    { id = 150; name = "Mewtwo";      types = ["Psychic"];         generation = 1; moves = ["Psychic", "Psystrike", "Aura Sphere", "Shadow Ball"]; abilities = ["Pressure", "Unnerve"] },
    { id = 151; name = "Mew";         types = ["Psychic"];         generation = 1; moves = ["Pound", "Psychic", "Transform", "Metronome"]; abilities = ["Synchronize"] },
    // Gen 2
    { id = 152; name = "Chikorita";   types = ["Grass"];           generation = 2; moves = ["Tackle", "Razor Leaf", "Body Slam", "Synthesis"]; abilities = ["Overgrow"] },
    { id = 155; name = "Cyndaquil";   types = ["Fire"];            generation = 2; moves = ["Tackle", "Ember", "Flame Wheel", "Flamethrower"]; abilities = ["Blaze"] },
    { id = 158; name = "Totodile";    types = ["Water"];           generation = 2; moves = ["Scratch", "Water Gun", "Bite", "Aqua Tail"]; abilities = ["Torrent"] },
    { id = 175; name = "Togepi";      types = ["Fairy"];           generation = 2; moves = ["Charm", "Metronome", "Sweet Kiss", "Yawn"]; abilities = ["Hustle", "Serene Grace"] },
    { id = 196; name = "Espeon";      types = ["Psychic"];         generation = 2; moves = ["Psychic", "Psybeam", "Morning Sun", "Shadow Ball"]; abilities = ["Synchronize", "Magic Bounce"] },
    { id = 197; name = "Umbreon";     types = ["Dark"];            generation = 2; moves = ["Faint Attack", "Moonlight", "Mean Look", "Pursuit"]; abilities = ["Synchronize", "Inner Focus"] },
    { id = 225; name = "Delibird";    types = ["Ice", "Flying"];   generation = 2; moves = ["Present", "Ice Shard", "Aerial Ace", "Blizzard"]; abilities = ["Vital Spirit", "Hustle"] },
    { id = 245; name = "Suicune";     types = ["Water"];           generation = 2; moves = ["Surf", "Ice Beam", "Calm Mind", "Roar"]; abilities = ["Pressure", "Water Absorb"] },
    { id = 249; name = "Lugia";       types = ["Psychic", "Flying"]; generation = 2; moves = ["Aeroblast", "Psychic", "Recover", "Hydro Pump"]; abilities = ["Pressure", "Multiscale"] },
    { id = 250; name = "Ho-Oh";       types = ["Fire", "Flying"];  generation = 2; moves = ["Sacred Fire", "Fire Blast", "Recover", "Earthquake"]; abilities = ["Pressure", "Regenerator"] },
    // Gen 3
    { id = 252; name = "Treecko";     types = ["Grass"];           generation = 3; moves = ["Pound", "Absorb", "Leaf Blade", "Dragon Breath"]; abilities = ["Overgrow", "Unburden"] },
    { id = 255; name = "Torchic";     types = ["Fire"];            generation = 3; moves = ["Scratch", "Ember", "Blaze Kick", "Sky Uppercut"]; abilities = ["Blaze", "Speed Boost"] },
    { id = 258; name = "Mudkip";      types = ["Water"];           generation = 3; moves = ["Tackle", "Water Gun", "Mud Slap", "Surf"]; abilities = ["Torrent", "Damp"] },
    { id = 282; name = "Gardevoir";   types = ["Psychic", "Fairy"]; generation = 3; moves = ["Psychic", "Moonblast", "Calm Mind", "Shadow Ball"]; abilities = ["Synchronize", "Trace", "Telepathy"] },
    { id = 302; name = "Sableye";     types = ["Dark", "Ghost"];   generation = 3; moves = ["Shadow Sneak", "Foul Play", "Will-O-Wisp", "Recover"]; abilities = ["Keen Eye", "Stall", "Prankster"] },
    { id = 334; name = "Altaria";     types = ["Dragon", "Flying"]; generation = 3; moves = ["Dragon Breath", "Moonblast", "Cotton Guard", "Sky Attack"]; abilities = ["Cloud Nine", "Natural Cure"] },
    { id = 373; name = "Salamence";   types = ["Dragon", "Flying"]; generation = 3; moves = ["Dragon Claw", "Flamethrower", "Hyper Voice", "Earthquake"]; abilities = ["Intimidate", "Moxie"] },
    { id = 376; name = "Metagross";   types = ["Steel", "Psychic"]; generation = 3; moves = ["Meteor Mash", "Psychic", "Earthquake", "Ice Punch"]; abilities = ["Clear Body", "Light Metal"] },
    { id = 384; name = "Rayquaza";    types = ["Dragon", "Flying"]; generation = 3; moves = ["Dragon Ascent", "Hyper Voice", "Outrage", "Extreme Speed"]; abilities = ["Air Lock", "Cloud Nine"] },
    // Gen 4
    { id = 387; name = "Turtwig";     types = ["Grass"];           generation = 4; moves = ["Tackle", "Razor Leaf", "Seed Bomb", "Earthquake"]; abilities = ["Overgrow", "Shell Armor"] },
    { id = 390; name = "Chimchar";    types = ["Fire"];            generation = 4; moves = ["Scratch", "Ember", "Fury Swipes", "Mach Punch"]; abilities = ["Blaze", "Iron Fist"] },
    { id = 393; name = "Piplup";      types = ["Water"];           generation = 4; moves = ["Pound", "Bubble", "Brine", "Hydro Pump"]; abilities = ["Torrent", "Defiant"] },
    { id = 448; name = "Lucario";     types = ["Fighting", "Steel"]; generation = 4; moves = ["Aura Sphere", "Close Combat", "Metal Claw", "Dragon Pulse"]; abilities = ["Steadfast", "Inner Focus", "Justified"] },
    { id = 468; name = "Togekiss";    types = ["Fairy", "Flying"]; generation = 4; moves = ["Air Slash", "Aura Sphere", "Thunder Wave", "Nasty Plot"]; abilities = ["Hustle", "Serene Grace", "Super Luck"] },
    { id = 471; name = "Glaceon";     types = ["Ice"];             generation = 4; moves = ["Ice Beam", "Blizzard", "Shadow Ball", "Water Pulse"]; abilities = ["Snow Cloak", "Ice Body"] },
    { id = 484; name = "Palkia";      types = ["Water", "Dragon"]; generation = 4; moves = ["Spacial Rend", "Hydro Pump", "Aura Sphere", "Dragon Pulse"]; abilities = ["Pressure", "Telepathy"] },
    { id = 487; name = "Giratina";    types = ["Ghost", "Dragon"]; generation = 4; moves = ["Shadow Force", "Outrage", "Dragon Claw", "Earth Power"]; abilities = ["Pressure", "Telepathy"] },
    // Gen 5
    { id = 495; name = "Snivy";       types = ["Grass"];           generation = 5; moves = ["Tackle", "Vine Whip", "Leaf Blade", "Coil"]; abilities = ["Overgrow", "Contrary"] },
    { id = 498; name = "Tepig";       types = ["Fire"];            generation = 5; moves = ["Tackle", "Ember", "Flame Charge", "Flare Blitz"]; abilities = ["Blaze", "Thick Fat"] },
    { id = 501; name = "Oshawott";    types = ["Water"];           generation = 5; moves = ["Tackle", "Water Gun", "Razor Shell", "Aqua Jet"]; abilities = ["Torrent", "Shell Armor"] },
    { id = 534; name = "Conkeldurr"; types = ["Fighting"];        generation = 5; moves = ["Hammer Arm", "Stone Edge", "Mach Punch", "Bulk Up"]; abilities = ["Guts", "Sheer Force", "Iron Fist"] },
    { id = 571; name = "Zoroark";     types = ["Dark"];            generation = 5; moves = ["Night Daze", "Foul Play", "Night Slash", "Focus Blast"]; abilities = ["Illusion"] },
    { id = 579; name = "Reuniclus";   types = ["Psychic"];         generation = 5; moves = ["Psyshock", "Focus Blast", "Shadow Ball", "Trick Room"]; abilities = ["Overcoat", "Magic Guard", "Regenerator"] },
    { id = 644; name = "Zekrom";      types = ["Dragon", "Electric"]; generation = 5; moves = ["Bolt Strike", "Fusion Bolt", "Dragon Claw", "Outrage"]; abilities = ["Teravolt"] },
    { id = 646; name = "Kyurem";      types = ["Dragon", "Ice"];   generation = 5; moves = ["Glaciate", "Draco Meteor", "Blizzard", "Outrage"]; abilities = ["Pressure", "Unnerve"] },
    // Gen 6
    { id = 650; name = "Chespin";     types = ["Grass"];           generation = 6; moves = ["Tackle", "Vine Whip", "Pin Missile", "Seed Bomb"]; abilities = ["Overgrow", "Bulletproof"] },
    { id = 653; name = "Fennekin";    types = ["Fire"];            generation = 6; moves = ["Scratch", "Ember", "Psybeam", "Flamethrower"]; abilities = ["Blaze", "Magician"] },
    { id = 656; name = "Froakie";     types = ["Water"];           generation = 6; moves = ["Pound", "Water Pulse", "Quick Attack", "Hydro Pump"]; abilities = ["Torrent", "Protean"] },
    { id = 681; name = "Aegislash";   types = ["Steel", "Ghost"];  generation = 6; moves = ["Shadow Sneak", "King's Shield", "Sacred Sword", "Iron Head"]; abilities = ["Stance Change"] },
    { id = 700; name = "Sylveon";     types = ["Fairy"];           generation = 6; moves = ["Moonblast", "Draining Kiss", "Calm Mind", "Hyper Voice"]; abilities = ["Cute Charm", "Pixilate"] },
    { id = 716; name = "Xerneas";     types = ["Fairy"];           generation = 6; moves = ["Moonblast", "Geomancy", "Focus Blast", "Thunder"]; abilities = ["Fairy Aura"] },
    { id = 717; name = "Yveltal";     types = ["Dark", "Flying"];  generation = 6; moves = ["Oblivion Wing", "Dark Pulse", "Disable", "Sucker Punch"]; abilities = ["Dark Aura"] },
    { id = 718; name = "Zygarde";     types = ["Dragon", "Ground"]; generation = 6; moves = ["Land's Wrath", "Earthquake", "Dragon Tail", "Coil"]; abilities = ["Aura Break", "Power Construct"] },
    // Gen 7
    { id = 722; name = "Rowlet";      types = ["Grass", "Flying"]; generation = 7; moves = ["Tackle", "Leafage", "Razor Leaf", "Brave Bird"]; abilities = ["Overgrow", "Long Reach"] },
    { id = 725; name = "Litten";      types = ["Fire"];            generation = 7; moves = ["Scratch", "Ember", "Fire Fang", "Flamethrower"]; abilities = ["Blaze", "Intimidate"] },
    { id = 728; name = "Popplio";     types = ["Water"];           generation = 7; moves = ["Pound", "Water Gun", "Disarming Voice", "Aqua Jet"]; abilities = ["Torrent", "Liquid Voice"] },
    { id = 745; name = "Lycanroc";    types = ["Rock"];            generation = 7; moves = ["Rock Throw", "Accelerock", "Stone Edge", "Crunch"]; abilities = ["Keen Eye", "Sand Rush", "Tough Claws"] },
    { id = 773; name = "Silvally";    types = ["Normal"];          generation = 7; moves = ["Multi-Attack", "Parting Shot", "X-Scissor", "Iron Head"]; abilities = ["RKS System"] },
    { id = 791; name = "Solgaleo";    types = ["Psychic", "Steel"]; generation = 7; moves = ["Sunsteel Strike", "Psychic", "Flash Cannon", "Earthquake"]; abilities = ["Full Metal Body"] },
    { id = 792; name = "Lunala";      types = ["Psychic", "Ghost"]; generation = 7; moves = ["Moongeist Beam", "Psyshock", "Shadow Ball", "Calm Mind"]; abilities = ["Shadow Shield"] },
    // Gen 8
    { id = 810; name = "Grookey";     types = ["Grass"];           generation = 8; moves = ["Scratch", "Branch Poke", "Drum Beating", "Grassy Glide"]; abilities = ["Overgrow", "Grassy Surge"] },
    { id = 813; name = "Scorbunny";   types = ["Fire"];            generation = 8; moves = ["Tackle", "Ember", "Flame Charge", "Pyro Ball"]; abilities = ["Blaze", "Libero"] },
    { id = 816; name = "Sobble";      types = ["Water"];           generation = 8; moves = ["Pound", "Water Gun", "Tearful Look", "Liquidation"]; abilities = ["Torrent", "Sniper"] },
    { id = 854; name = "Sinistea";    types = ["Ghost"];           generation = 8; moves = ["Shadow Sneak", "Hex", "Teatime", "Poltergeist"]; abilities = ["Weak Armor", "Cursed Body"] },
    { id = 888; name = "Zacian";      types = ["Fairy"];           generation = 8; moves = ["Behemoth Blade", "Play Rough", "Sacred Sword", "Close Combat"]; abilities = ["Intrepid Sword"] },
    { id = 889; name = "Zamazenta";   types = ["Fighting"];        generation = 8; moves = ["Behemoth Bash", "Close Combat", "Iron Defense", "Crunch"]; abilities = ["Dauntless Shield"] },
    // Gen 9
    { id = 906; name = "Sprigatito";  types = ["Grass"];           generation = 9; moves = ["Scratch", "Leafage", "Magical Leaf", "Flower Trick"]; abilities = ["Overgrow", "Protean"] },
    { id = 909; name = "Fuecoco";     types = ["Fire"];            generation = 9; moves = ["Tackle", "Ember", "Bite", "Flamethrower"]; abilities = ["Blaze", "Unaware"] },
    { id = 912; name = "Quaxly";      types = ["Water"];           generation = 9; moves = ["Pound", "Water Gun", "Wing Attack", "Aqua Step"]; abilities = ["Torrent", "Moxie"] },
    { id = 938; name = "Flutter Mane"; types = ["Ghost", "Fairy"]; generation = 9; moves = ["Moonblast", "Shadow Ball", "Mystical Fire", "Calm Mind"]; abilities = ["Protosynthesis"] },
    { id = 941; name = "Slither Wing"; types = ["Bug", "Fighting"]; generation = 9; moves = ["Close Combat", "Flare Blitz", "First Impression", "Earthquake"]; abilities = ["Protosynthesis"] },
    { id = 996; name = "Koraidon";    types = ["Fighting", "Dragon"]; generation = 9; moves = ["Collision Course", "Dragon Claw", "Flare Blitz", "Close Combat"]; abilities = ["Orichalcum Pulse"] },
    { id = 997; name = "Miraidon";    types = ["Electric", "Dragon"]; generation = 9; moves = ["Electro Drift", "Dragon Pulse", "Parabolic Charge", "Outrage"]; abilities = ["Hadron Engine"] },
  ];

  public func allPokemon() : [Types.PokemonEntry] {
    DATA;
  };

  public func byGeneration(gen : ?Types.Generation) : [Types.PokemonEntry] {
    switch gen {
      case null { DATA };
      case (?g) { DATA.filter(func(p) { p.generation == g }) };
    };
  };

  public func getById(id : Nat) : ?Types.PokemonEntry {
    DATA.find(func(p) { p.id == id });
  };

  /// Fisher-Yates shuffle pick using a simple LCG seeded by `seed`.
  public func pickRandom(pool : [Types.PokemonEntry], count : Nat, seed : Nat) : [Types.PokemonEntry] {
    let n = pool.size();
    if (n == 0 or count == 0) return [];
    let actualCount = if (count > n) n else count;
    // copy to mutable array for swapping
    let arr = pool.toVarArray<Types.PokemonEntry>();
    var rng = seed + 1;
    var i = n;
    while (i > 1) {
      // LCG step
      rng := (rng * 6364136223846793005 + 1442695040888963407) % 18446744073709551615;
      let j = rng % i;
      let tmp = arr[i - 1];
      arr[i - 1] := arr[j];
      arr[j] := tmp;
      i -= 1;
    };
    Array.tabulate<Types.PokemonEntry>(actualCount, func(k) { arr[k] });
  };
};
