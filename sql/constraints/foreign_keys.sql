-- Foreign keys for these relationships
-- Ref: issues.issue_type_id - issue_types.id
-- Ref: issues.status_id - issue_statuses.id

ALTER TABLE issues ADD CONSTRAINT issues_issue_type_id_fkey FOREIGN KEY (issue_type_id) REFERENCES issue_types (id);
ALTER TABLE issues ADD CONSTRAINT issues_status_id_fkey FOREIGN KEY (status_id) REFERENCES issue_statuses (id);