# Проект Вычислитель отличий 
[![Maintainability](https://api.codeclimate.com/v1/badges/eac5ac9826a6852cf914/maintainability)](https://codeclimate.com/github/EvgeniyKoch/frontend-project-lvl2/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/eac5ac9826a6852cf914/test_coverage)](https://codeclimate.com/github/EvgeniyKoch/frontend-project-lvl2/test_coverage)

## Описание
В рамках данного проекта реализована утилита для поиска отличий в конфигурационных файлах.

### Возможности утилиты:

- Поддержка разных форматов
- Генерация отчета в виде plain text, pretty и json

### Пример использования:
```
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```
