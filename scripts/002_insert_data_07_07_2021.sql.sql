start transaction;

-- Designations added
INSERT INTO public.designation
(designation_name, designation_status)
VALUES('Teacher', 'Active');

INSERT INTO public.designation
(designation_name, designation_status)
VALUES('Student', 'Active');

-- People Data added

INSERT INTO public.people
(people_first_name, people_last_name, people_address, people_phone_number, people_designation_id)
VALUES('Raymond', 'Blake', '7th street road, India', 9387374566, (select designation_id from designation where designation_name='Teacher'));

INSERT INTO public.people
(people_first_name, people_last_name, people_address, people_phone_number, people_designation_id)
VALUES('Joe', 'Root', '8th street road, India', 9387374567, (select designation_id from designation where designation_name='Teacher'));

INSERT INTO public.people
(people_first_name, people_last_name, people_address, people_phone_number, people_designation_id)
VALUES('Rizvi', 'Sana', '12th street road, India', 9387374568, (select designation_id from designation where designation_name='Teacher'));

INSERT INTO public.people
(people_first_name, people_last_name, people_address, people_phone_number, people_designation_id)
VALUES('Anitha', 'Anandh', '9th street road, India', 9387374569, (select designation_id from designation where designation_name='Teacher'));

INSERT INTO public.people
(people_first_name, people_last_name, people_address, people_phone_number, people_designation_id)
VALUES('Richie', 'Rich', '19th church road, India', 8387343569, (select designation_id from designation where designation_name='Student'));

--Add rows to subject table

INSERT INTO public.subject
(subject_name, subject_status)
VALUES('Maths', 'Active');

INSERT INTO public.subject
(subject_name, subject_status)
VALUES('Science', 'Active');

INSERT INTO public.subject
(subject_name, subject_status)
VALUES('Social', 'Active');

INSERT INTO public.subject
(subject_name, subject_status)
VALUES('English', 'Active');

--Add rows to class table

INSERT INTO public."class"
(class_name, class_status, class_teacher)
VALUES('Class 1', 'Active', (select people_id from people where people_first_name='Raymond' and people_last_name='Blake'));


INSERT INTO public."class"
(class_name, class_status, class_teacher)
VALUES('Class 2', 'Active', (select people_id from people where people_first_name='Joe' and people_last_name='Root'));


INSERT INTO public."class"
(class_name, class_status, class_teacher)
VALUES('Class 3', 'Active', (select people_id from people where people_first_name='Rizvi' and people_last_name='Sana'));


INSERT INTO public."class"
(class_name, class_status, class_teacher)
VALUES('Class 4', 'Active', (select people_id from people where people_first_name='Anitha' and people_last_name='Anandh'));

--Map teachers to class for subjects
--Class 1
INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 1'), (select subject_id from subject where subject_name='Maths'), 
(select people_id from people where people_first_name='Anitha' and people_last_name='Anandh'));

INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 1'), (select subject_id from subject where subject_name='English'), 
(select people_id from people where people_first_name='Raymond' and people_last_name='Blake'));

INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 1'), (select subject_id from subject where subject_name='Social'), 
(select people_id from people where people_first_name='Raymond' and people_last_name='Blake'));

INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 1'), (select subject_id from subject where subject_name='Science'), 
(select people_id from people where people_first_name='Joe' and people_last_name='Root'));

--class 2
INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 2'), (select subject_id from subject where subject_name='Maths'), 
(select people_id from people where people_first_name='Anitha' and people_last_name='Anandh'));

INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 2'), (select subject_id from subject where subject_name='English'), 
(select people_id from people where people_first_name='Rizvi' and people_last_name='Sana'));

INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 2'), (select subject_id from subject where subject_name='Social'), 
(select people_id from people where people_first_name='Raymond' and people_last_name='Blake'));

INSERT INTO public.subject_class_teacher_mapping
(class_id, subject_id, teacher_id)
VALUES((select class_id from class where class_name='Class 2'), (select subject_id from subject where subject_name='Science'), 
(select people_id from people where people_first_name='Joe' and people_last_name='Root'));

commit;