1. [ ] User login
2. [ ] Access to games of player from dota 2 api
3. [ ] Custom player information based off each in game hero.
4. [ ] Collection of dota 2 item and hero data
5. [ ] Dota 2 Patch Notes section
6. [ ] Hero Description pages
7. [ ] Item Description pages
8. [ ] Item Editing
9. [ ] Hero Editing


Database:
User:
- username
- password
- 
Hero:
- name
- primaryAttribute
- imageLoc
- abilites


PlayersHero?? (this is where data from how well a player plays a hero):
- hero
- player
- winrate
- heroMatchup
- patch

heromatchup (this is a players hero matchup)
- player
- hero
- opposinghero
- winrate
- patch

heroitem (this is a players, hero item matchup)
- player
- hero
- item
- winrate
- patch

item:
- name
- cost
- alterations
- description
- upgradePath
- predecessorPath
- imageLoc
- active
