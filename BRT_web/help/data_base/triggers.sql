
create trigger conditional_insert on history_trigger_point
for insert as
if (
  select count(*) from history_trigger_point, inserted
  where history_trigger_point.plate_number = inserted.plate_number
    AND history_trigger_point.equip_id = inserted.equip_id
    AND history_trigger_point.point = inserted.point
    AND history_trigger_point.dir = inserted.dir
    AND history_trigger_point.label_time = inserted.label_time
  ) < > @@ROWCOUNT
begin
  delete TOP (1)  history_trigger_point from history_trigger_point, inserted
  where history_trigger_point.plate_number = inserted.plate_number
  AND history_trigger_point.equip_id = inserted.equip_id
  AND history_trigger_point.point = inserted.point
  AND history_trigger_point.dir = inserted.dir
  AND history_trigger_point.label_time = inserted.label_time
end

USE AdventureWorks2012;
GO
-- Find an existing index named AK_UnitMeasure_Name and delete it if found
IF EXISTS (SELECT name from sys.indexes
           WHERE name = N'AK_UnitMeasure_Name')
   DROP INDEX AK_UnitMeasure_Name ON Production.UnitMeasure;
GO
-- Create a unique index called AK_UnitMeasure_Name
-- on the Production.UnitMeasure table using the Name column.
CREATE UNIQUE INDEX AK_UnitMeasure_Name
   ON Production.UnitMeasure (Name);
GO